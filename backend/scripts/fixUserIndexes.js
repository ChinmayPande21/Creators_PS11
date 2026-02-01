import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = String(process.env.MONGODB_URI || "").trim();

if (!MONGODB_URI) {
  // eslint-disable-next-line no-console
  console.error("MONGODB_URI is not set. Add it to backend/.env");
  process.exit(1);
}

const USERS_COLLECTION = process.env.USERS_COLLECTION || "users";

const main = async () => {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

  const db = mongoose.connection.db;
  const users = db.collection(USERS_COLLECTION);

  const indexes = await users.indexes();
  const indexNames = indexes.map((i) => i.name);

  // eslint-disable-next-line no-console
  console.log("Users collection:", USERS_COLLECTION);
  // eslint-disable-next-line no-console
  console.log("Existing indexes:", indexNames);

  // Drop old unique compound index if it exists
  const oldIndexName = "email_1_role_1";
  if (indexNames.includes(oldIndexName)) {
    // eslint-disable-next-line no-console
    console.log(`Dropping old index: ${oldIndexName}`);
    await users.dropIndex(oldIndexName);
  }

  // Check duplicate emails before creating unique index
  const duplicates = await users
    .aggregate([
      {
        $group: {
          _id: "$email",
          count: { $sum: 1 },
          ids: { $push: "$_id" },
        },
      },
      { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 },
    ])
    .toArray();

  if (duplicates.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      "Cannot create unique email index because duplicate emails exist.",
    );
    // eslint-disable-next-line no-console
    console.error(
      "Fix by deleting/merging duplicates, then rerun this script. Sample duplicates:",
    );
    // eslint-disable-next-line no-console
    console.error(
      duplicates.map((d) => ({ email: d._id, count: d.count })).slice(0, 10),
    );
    process.exitCode = 2;
    return;
  }

  // Create unique email index
  // eslint-disable-next-line no-console
  console.log("Creating unique index: email_1 (unique)");
  await users.createIndex({ email: 1 }, { unique: true, name: "email_1" });

  const after = await users.indexes();
  // eslint-disable-next-line no-console
  console.log(
    "Indexes after:",
    after.map((i) => i.name),
  );
};

main()
  .then(async () => {
    await mongoose.disconnect();
    // eslint-disable-next-line no-console
    console.log("Done.");
  })
  .catch(async (err) => {
    // eslint-disable-next-line no-console
    console.error("Failed:", err?.message || err);
    try {
      await mongoose.disconnect();
    } catch {
      // ignore
    }
    process.exit(1);
  });
