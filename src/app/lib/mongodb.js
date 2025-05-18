import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://itsfor017:hwSW0weqS0lV1FNt@cluster0.7pi0w.mongodb.net/gcuniversitytalks";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
