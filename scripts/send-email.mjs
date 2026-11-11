#!/usr/bin/env node
// Sends UPA Care outreach emails through Resend instead of the Gmail connector.
// Why: the Gmail connector rewrites every link to https://www.google.com/url?q=...,
// which adds a "Redirect Notice" click and looks suspicious to spam filters.
// Resend sends the HTML exactly as written (keep click tracking OFF in Resend).
//
// Usage:
//   node scripts/send-email.mjs emails.json            # dry run: validates and prints, sends nothing
//   node scripts/send-email.mjs emails.json --send     # really sends
//
// emails.json: an array of { "to": "a@b.com", "subject": "...", "text": "...", "html": "..." }
// ("html" is optional; if missing, the text is converted to simple HTML with clickable links.)
//
// Config (environment variables, never commit them):
//   RESEND_API_KEY  API key from resend.com (in Claude Code cloud sessions the proxy can inject it)
//   EMAIL_FROM      e.g. "Patricio Zaltzberg <info@upaentertainment.com>" (domain must be verified in Resend)
//   EMAIL_REPLY_TO  optional, defaults to the address in EMAIL_FROM

import { readFile } from 'node:fs/promises';

const [file, ...flags] = process.argv.slice(2);
const SEND = flags.includes('--send');

if (!file) {
  console.error('Usage: node scripts/send-email.mjs <emails.json> [--send]');
  process.exit(1);
}

const FROM = process.env.EMAIL_FROM;
const API_KEY = process.env.RESEND_API_KEY;
const REPLY_TO = process.env.EMAIL_REPLY_TO || (FROM && (FROM.match(/<([^>]+)>/)?.[1] || FROM));

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const textToHtml = (text) =>
  '<div>' +
  escapeHtml(text)
    .replace(/https?:\/\/[^\s<]+/g, (url) => `<a href="${url}">${url}</a>`)
    .replace(/\n/g, '<br>') +
  '</div>';

const isEmail = (s) => typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const emails = JSON.parse(await readFile(file, 'utf8'));
if (!Array.isArray(emails) || emails.length === 0) {
  console.error('The JSON file must contain a non-empty array of emails.');
  process.exit(1);
}

const problems = [];
emails.forEach((e, i) => {
  if (!isEmail(e.to)) problems.push(`#${i + 1}: invalid "to"`);
  if (!e.subject) problems.push(`#${i + 1}: missing "subject"`);
  if (!e.text) problems.push(`#${i + 1}: missing "text"`);
  const body = `${e.text || ''} ${e.html || ''}`;
  if (/google\.com\/url\?/i.test(body)) problems.push(`#${i + 1}: contains a google.com/url redirect link; use the direct URL`);
});
if (problems.length) {
  console.error('Fix these before sending:\n- ' + problems.join('\n- '));
  process.exit(1);
}

if (!SEND) {
  for (const e of emails) console.log(`[dry run] to=${e.to} | subject=${e.subject}`);
  console.log(`\n${emails.length} email(s) validated. Nothing was sent. Add --send to send them.`);
  process.exit(0);
}

if (!FROM) {
  console.error('EMAIL_FROM is not set.');
  process.exit(1);
}
if (!API_KEY) {
  console.error('RESEND_API_KEY is not set.');
  process.exit(1);
}

let ok = 0;
for (const e of emails) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [e.to],
      reply_to: REPLY_TO,
      subject: e.subject,
      text: e.text,
      html: e.html || textToHtml(e.text),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.ok) {
    ok++;
    console.log(`sent    ${e.to}  id=${data.id}`);
  } else {
    console.log(`FAILED  ${e.to}  ${res.status} ${data.message || ''}`);
  }
  await new Promise((r) => setTimeout(r, 600)); // stay under Resend's default rate limit
}
console.log(`\n${ok}/${emails.length} sent.`);
process.exit(ok === emails.length ? 0 : 1);
