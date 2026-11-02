// Sends automatic WhatsApp follow-ups to customers who went quiet after the
// agent's last reply. Meant to be hit by a scheduled job (Vercel Cron — see
// the "crons" entry in vercel.json) rather than by a person or a webhook.
//
// Stage 0: first nudge after ~20h of silence. Stage 1: one final nudge after
// ~72h more silence. After that we leave the customer alone.

import { NextResponse } from 'next/server';
import { sendWhatsAppText, notifyAdmin } from '../../../lib/whatsapp';
import { getStaleConversations, recordFollowUp } from '../../../lib/whatsappConversations';
import { generateFollowUp } from '../../../lib/upaAgent';

export const dynamic = 'force-dynamic';

const STAGE_DELAYS_MS = [
  20 * 60 * 60 * 1000, // stage 0: 20 hours of silence
  72 * 60 * 60 * 1000, // stage 1: 72 more hours of silence
];

function isAuthorized(request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // no secret configured — treat as open (dev only)
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const results = { sent: 0, failed: 0 };

  for (let stage = 0; stage < STAGE_DELAYS_MS.length; stage += 1) {
    const stale = await getStaleConversations(stage, STAGE_DELAYS_MS[stage]);

    for (const conversation of stale) {
      const waId = conversation._id;
      try {
        const history = (conversation.messages || []).map((m) => ({ role: m.role, text: m.text }));
        const text = await generateFollowUp(history, stage);
        if (!text) continue;

        await sendWhatsAppText(waId, text);
        await recordFollowUp(waId, text);
        await notifyAdmin(
          `🔁 Follow-up #${stage + 1} sent to ${conversation.contactName || waId} (${waId}):\n${text}`
        );
        results.sent += 1;
      } catch (err) {
        console.error(`Failed to send follow-up to ${waId}:`, err);
        results.failed += 1;
      }
    }
  }

  return NextResponse.json(results);
}
