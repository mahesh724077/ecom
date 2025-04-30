import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://hindumahesh3:hindumahesh3@cluster0.msd9i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) throw new Error("Please define MONGODB_URI");

let cached = global.mongoose || { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log("✅ MongoDB connected");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectToDB };
