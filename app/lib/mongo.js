// Shared MongoDB connection for server-side routes (API routes only — never import
// this from a client component). Caches the client across invocations so warm
// serverless functions reuse the same connection instead of opening a new one
// on every request.

import { MongoClient } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB_NAME || 'upacare';

let clientPromise = null;

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set — required to store WhatsApp conversation history.');
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(DB_NAME);
}
