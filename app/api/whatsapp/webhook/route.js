// WhatsApp Cloud API webhook — receives customer messages and replies
// automatically using the UPA sales agent (see app/lib/upaAgent.js).
//
// Setup: see WHATSAPP-AGENT.md at the repo root.

import { NextResponse } from 'next/server';
import { verifyWebhookSignature, sendWhatsAppText, notifyAdmin } from '../../../lib/whatsapp';
import { getConversation, appendMessages } from '../../../lib/whatsappConversations';
import { generateReply } from '../../../lib/upaAgent';

export const dynamic = 'force-dynamic';

// Meta calls this once, when you register the webhook URL in the Meta App
// dashboard, to prove you control the endpoint.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// Meta calls this on every inbound message / status update.
export async function POST(request) {
  const rawBody = await request.text();

  const signature = request.headers.get('x-hub-signature-256');
  if (!verifyWebhookSignature(rawBody, signature)) {
    console.warn('Rejected WhatsApp webhook with invalid signature');
    return new NextResponse('Invalid signature', { status: 401 });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  // Always ack quickly — Meta retries aggressively on non-2xx/slow responses.
  // We do the real work before returning since Vercel functions don't
  // guarantee execution continues after the response is sent.
  try {
    await handleWebhookPayload(payload);
  } catch (err) {
    console.error('Error handling WhatsApp webhook payload:', err);
  }

  return NextResponse.json({ received: true });
}

async function handleWebhookPayload(payload) {
  const entries = payload?.entry || [];

  for (const entry of entries) {
    for (const change of entry.changes || []) {
      const value = change.value || {};
      const messages = value.messages || [];
      if (messages.length === 0) continue; // e.g. a delivery/read status update

      const contact = value.contacts?.[0];
      const contactName = contact?.profile?.name;

      for (const message of messages) {
        await handleIncomingMessage(message, contactName);
      }
    }
  }
}

async function handleIncomingMessage(message, contactName) {
  const waId = message.from;
  if (!waId) return;

  // Only plain text is auto-handled for now; anything else gets a warm
  // human handoff rather than a guess at what to do with it.
  if (message.type !== 'text' || !message.text?.body) {
    await sendWhatsAppText(
      waId,
      "Thanks for sending that! Someone from our team will take a look and get back to you shortly."
    );
    return;
  }

  const incomingText = message.text.body;
  const history = await getConversation(waId);

  const replyText = await generateReply(history, incomingText);

  await sendWhatsAppText(waId, replyText);

  await appendMessages(waId, contactName, [
    { role: 'user', text: incomingText },
    { role: 'assistant', text: replyText },
  ]);

  await notifyAdmin(
    `📩 ${contactName || waId} (${waId}):\n${incomingText}\n\n🤖 Reply sent:\n${replyText}`
  );
}
