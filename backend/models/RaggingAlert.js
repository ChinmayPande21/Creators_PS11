import mongoose from "mongoose";

const RAGGING_TYPES = [
  "Physical ragging",
  "Verbal ragging",
  "Psychological / emotional ragging",
  "Sexual ragging",
  "Economic ragging",
  "Cyber ragging",
  "Institutional ragging",
  "Discriminatory ragging",
];

const INTENSITIES = ["Low", "Medium", "High", "Severe"];

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, trim: true, required: true },
    createdByEmail: { type: String, trim: true, lowercase: true },
    createdByRole: { type: String, trim: true },
  },
  { timestamps: true },
);

const raggingAlertSchema = new mongoose.Schema(
  {
    location: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },
    raggingType: { type: String, enum: RAGGING_TYPES, required: true },
    intensity: { type: String, enum: INTENSITIES, required: true },

    photoDataUrl: { type: String, trim: true, default: "" },

    createdByEmail: { type: String, trim: true, lowercase: true, default: "" },
    createdByName: { type: String, trim: true, default: "" },
    createdByRole: { type: String, trim: true, default: "" },

    status: {
      type: String,
      enum: ["pending", "acknowledged"],
      default: "pending",
    },
    acknowledgedAt: { type: Date, default: null },
    acknowledgedByEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    wardenNote: { type: String, trim: true, default: "" },
    wardenPhotoDataUrl: { type: String, trim: true, default: "" },

    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true },
);

raggingAlertSchema.methods.toClient = function toClient() {
  return {
    id: this._id.toString(),
    location: this.location,
    message: this.message,
    raggingType: this.raggingType,
    intensity: this.intensity,
    photoDataUrl: this.photoDataUrl,
    createdAt: this.createdAt,
    createdByEmail: this.createdByEmail,
    createdByName: this.createdByName,
    createdByRole: this.createdByRole,
    status: this.status,
    acknowledgedAt: this.acknowledgedAt,
    acknowledgedByEmail: this.acknowledgedByEmail,
    wardenNote: this.wardenNote,
    wardenPhotoDataUrl: this.wardenPhotoDataUrl,
    comments: (this.comments || []).map((c) => ({
      id: c._id.toString(),
      text: c.text,
      createdAt: c.createdAt,
      createdByEmail: c.createdByEmail,
      createdByRole: c.createdByRole,
    })),
  };
};

export const RaggingAlert =
  mongoose.models.RaggingAlert ||
  mongoose.model("RaggingAlert", raggingAlertSchema);

export const RAGGING_TYPES_LIST = RAGGING_TYPES;
export const RAGGING_INTENSITIES = INTENSITIES;
