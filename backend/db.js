import mongoose from "mongoose";

export const connectMongo = async (uri) => {
  const mongoUri = String(uri || process.env.MONGODB_URI || "").trim();

  if (!mongoUri) {
    // Allow running without DB configured (useful for local UI work)
    // eslint-disable-next-line no-console
    console.warn("MONGODB_URI not set; skipping MongoDB connection.");
    return { connected: false, skipped: true };
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });

  // eslint-disable-next-line no-console
  console.log("MongoDB connected");

  return { connected: true, skipped: false };
};

export const getMongoStatus = () => {
  const state = mongoose.connection?.readyState ?? 0;
  return {
    state,
    connected: state === 1,
  };
};
