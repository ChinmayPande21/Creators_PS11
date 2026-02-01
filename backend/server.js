import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectMongo, getMongoStatus } from "./db.js";
import authRouter from "./routes/auth.js";
import raggingRouter from "./routes/ragging.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5174;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

const allowedOrigins = FRONTEND_ORIGIN.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // allow non-browser requests (curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

app.use("/api/auth", authRouter);
app.use("/api/ragging", raggingRouter);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "hostel-backend",
    message: "Backend is running. Try /api/health",
    health: "/api/health",
    api: "/api",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "hostel-backend",
    time: new Date().toISOString(),
    db: getMongoStatus(),
  });
});

// Placeholder routes (no DB yet)
app.get("/api", (req, res) => {
  res.json({
    ok: true,
    message: "Backend is running. Add routes under /api/*",
  });
});

app.get("/api/db/info", async (req, res) => {
  const status = getMongoStatus();
  if (!status.connected) {
    res
      .status(503)
      .json({ ok: false, error: "MongoDB not connected", db: status });
    return;
  }

  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    res.json({
      ok: true,
      db: {
        name: db.databaseName,
        collections: collections.map((c) => c.name).sort(),
      },
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Failed to read DB info" });
  }
});

app.post("/api/db/seed", async (req, res) => {
  const status = getMongoStatus();
  if (!status.connected) {
    res
      .status(503)
      .json({ ok: false, error: "MongoDB not connected", db: status });
    return;
  }

  try {
    const db = mongoose.connection.db;
    const result = await db.collection("system_checks").insertOne({
      createdAt: new Date(),
      note: "seeded by backend",
    });
    res.json({
      ok: true,
      insertedId: result.insertedId,
      collection: "system_checks",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: "Failed to seed" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: "Not Found",
    path: req.path,
  });
});

const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
};

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start backend:", err);
  process.exitCode = 1;
});
