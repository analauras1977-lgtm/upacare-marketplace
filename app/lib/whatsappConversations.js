// Conversation history for the WhatsApp agent, keyed by the customer's WhatsApp
// id (wa_id / phone number). Serverless functions are stateless between
// invocations, so this persists just enough context for Claude to keep track
// of what has already been asked/quoted in a given conversation, plus the
// bookkeeping the follow-up cron job needs to know who's gone quiet.

import { getDb } from './mongo';

const COLLECTION = 'whatsapp_conversations';
const MAX_MESSAGES = 40; // ~20 turns of back-and-forth is plenty of context

export async function getConversation(waId) {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ _id: waId });
  return doc?.messages || [];
}

export async function appendMessages(waId, contactName, newMessages) {
  const db = await getDb();
  const now = new Date();
  const timestamped = newMessages.map((m) => ({ ...m, at: now }));
  const last = newMessages[newMessages.length - 1];

  await db.collection(COLLECTION).updateOne(
    { _id: waId },
    {
      $set: {
        contactName: contactName || null,
        updatedAt: now,
        lastMessageAt: now,
        lastMessageRole: last.role,
        // Called whenever the customer sends a real message — they're
        // engaged again, so any future silence starts a fresh follow-up cycle.
        followUpsSent: 0,
      },
      $setOnInsert: { createdAt: now },
      $push: {
        messages: {
          $each: timestamped,
          $slice: -MAX_MESSAGES,
        },
      },
    },
    { upsert: true }
  );
}

/**
 * Conversations where the agent sent the last message and the customer has
 * gone quiet for at least `delayMs`, and we haven't already sent this stage's
 * follow-up. `stage` is 0-indexed (0 = first follow-up, 1 = second, ...).
 */
export async function getStaleConversations(stage, delayMs) {
  const db = await getDb();
  const cutoff = new Date(Date.now() - delayMs);

  return db
    .collection(COLLECTION)
    .find({
      lastMessageRole: 'assistant',
      lastMessageAt: { $lte: cutoff },
      followUpsSent: stage,
    })
    .toArray();
}

export async function recordFollowUp(waId, text) {
  const db = await getDb();
  const now = new Date();

  await db.collection(COLLECTION).updateOne(
    { _id: waId },
    {
      $set: { updatedAt: now, lastMessageAt: now, lastMessageRole: 'assistant' },
      $inc: { followUpsSent: 1 },
      $push: { messages: { $each: [{ role: 'assistant', text, at: now, followUp: true }], $slice: -MAX_MESSAGES } },
    }
  );
}
