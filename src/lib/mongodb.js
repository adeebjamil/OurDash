import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client = null;

export async function connectDB() {
  if (client) {
    return client;
  }

  client = await MongoClient.connect(uri);
  return client;
}