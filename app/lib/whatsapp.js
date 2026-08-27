// Thin client for the Meta WhatsApp Cloud API. Server-side only.

import crypto from 'crypto';

const GRAPH_VERSION = 'v20.0';

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

/**
 * Verifies the X-Hub-Signature-256 header Meta sends on every webhook POST,
 * using the WhatsApp app secret. `rawBody` must be the exact, unparsed
 * request body string used to compute the signature.
 */
export function verifyWebhookSignature(rawBody, signatureHeader) {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    // No secret configured — fail closed so we don't accept unverified webhooks
    // once this is meant to be running for real.
    return false;
  }
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false;

  const expected = crypto.createHmac('sha256', appSecret).update(rawBody, 'utf8').digest('hex');
  const provided = signatureHeader.slice('sha256='.length);

  const expectedBuf = Buffer.from(expected, 'hex');
  const providedBuf = Buffer.from(provided, 'hex');
  if (expectedBuf.length !== providedBuf.length) return false;

  return crypto.timingSafeEqual(expectedBuf, providedBuf);
}

/** Sends a plain text WhatsApp message to `to` (E.164, no leading +). */
export async function sendWhatsAppText(to, body) {
  const token = requireEnv('WHATSAPP_TOKEN');
  const phoneNumberId = requireEnv('WHATSAPP_PHONE_NUMBER_ID');

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body, preview_url: false },
      }),
    }
  );

  if (!res.ok) {
    const errorBody = await res.text().catch(() => '');
    throw new Error(`WhatsApp send failed (${res.status}): ${errorBody}`);
  }

  return res.json();
}

/**
 * Best-effort notification to UPA's own admin WhatsApp number so Patricio sees
 * every exchange the agent has with a customer. Never throws — a failure here
 * should not block the actual customer-facing reply.
 */
export async function notifyAdmin(text) {
  const adminNumber = process.env.UPA_ADMIN_WHATSAPP_NUMBER;
  if (!adminNumber) return;
  try {
    await sendWhatsAppText(adminNumber, text);
  } catch (err) {
    console.error('Failed to notify admin WhatsApp number:', err);
  }
}
