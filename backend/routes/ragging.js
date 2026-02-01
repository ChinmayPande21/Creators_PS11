import express from "express";
import mongoose from "mongoose";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  RaggingAlert,
  RAGGING_TYPES_LIST,
  RAGGING_INTENSITIES,
} from "../models/RaggingAlert.js";

const router = express.Router();

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(String(id));

router.get("/meta", requireAuth, (req, res) => {
  res.json({
    ok: true,
    raggingTypes: RAGGING_TYPES_LIST,
    intensities: RAGGING_INTENSITIES,
  });
});

router.get("/alerts", requireAuth, async (req, res) => {
  try {
    const role = req.user?.role;
    const email = String(req.user?.email || "").toLowerCase();

    const filter =
      role === "warden" ? {} : { createdByEmail: email ? email : "__none__" };

    const alerts = await RaggingAlert.find(filter)
      .sort({ createdAt: -1 })
      .limit(200);

    res.json({ ok: true, alerts: alerts.map((a) => a.toClient()) });
  } catch {
    res.status(500).json({ ok: false, error: "Failed to load alerts" });
  }
});

router.post("/alerts", requireAuth, async (req, res) => {
  try {
    const { location, message, raggingType, intensity, photoDataUrl } =
      req.body || {};

    const normalizedLocation = String(location || "").trim();
    const normalizedMessage = String(message || "").trim();

    if (!normalizedLocation) {
      res.status(400).json({ ok: false, error: "Location is required" });
      return;
    }
    if (!normalizedMessage) {
      res.status(400).json({ ok: false, error: "Message is required" });
      return;
    }

    if (!RAGGING_TYPES_LIST.includes(raggingType)) {
      res.status(400).json({ ok: false, error: "Invalid ragging type" });
      return;
    }

    if (!RAGGING_INTENSITIES.includes(intensity)) {
      res.status(400).json({ ok: false, error: "Invalid intensity" });
      return;
    }

    const alert = await RaggingAlert.create({
      location: normalizedLocation,
      message: normalizedMessage,
      raggingType,
      intensity,
      photoDataUrl: typeof photoDataUrl === "string" ? photoDataUrl : "",
      createdByEmail: String(req.user?.email || "").toLowerCase(),
      createdByName: String(req.user?.fullName || ""),
      createdByRole: String(req.user?.role || ""),
      status: "pending",
    });

    res.status(201).json({ ok: true, alert: alert.toClient() });
  } catch {
    res.status(500).json({ ok: false, error: "Failed to create alert" });
  }
});

router.patch(
  "/alerts/:id/acknowledge",
  requireAuth,
  requireRole(["warden"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        res.status(400).json({ ok: false, error: "Invalid id" });
        return;
      }

      const { wardenNote, wardenPhotoDataUrl } = req.body || {};

      const alert = await RaggingAlert.findByIdAndUpdate(
        id,
        {
          status: "acknowledged",
          acknowledgedAt: new Date(),
          acknowledgedByEmail: String(req.user?.email || "").toLowerCase(),
          wardenNote: typeof wardenNote === "string" ? wardenNote.trim() : "",
          wardenPhotoDataUrl:
            typeof wardenPhotoDataUrl === "string" ? wardenPhotoDataUrl : "",
        },
        { new: true },
      );

      if (!alert) {
        res.status(404).json({ ok: false, error: "Not found" });
        return;
      }

      res.json({ ok: true, alert: alert.toClient() });
    } catch {
      res.status(500).json({ ok: false, error: "Failed to acknowledge" });
    }
  },
);

router.post("/alerts/:id/comments", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      res.status(400).json({ ok: false, error: "Invalid id" });
      return;
    }

    const text = String(req.body?.text || "").trim();
    if (!text) {
      res.status(400).json({ ok: false, error: "Comment text is required" });
      return;
    }

    const alert = await RaggingAlert.findById(id);
    if (!alert) {
      res.status(404).json({ ok: false, error: "Not found" });
      return;
    }

    // Students can only comment on their own alerts
    const role = req.user?.role;
    const email = String(req.user?.email || "").toLowerCase();
    if (role !== "warden" && alert.createdByEmail !== email) {
      res.status(403).json({ ok: false, error: "Forbidden" });
      return;
    }

    alert.comments.push({
      text,
      createdByEmail: email,
      createdByRole: String(role || ""),
    });

    await alert.save();
    res.status(201).json({ ok: true, alert: alert.toClient() });
  } catch {
    res.status(500).json({ ok: false, error: "Failed to add comment" });
  }
});

export default router;
