import mongoose from "mongoose";

const ALLOWED_ROLES = ["student", "warden"];

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    role: { type: String, enum: ALLOWED_ROLES, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.index({ email: 1, role: 1 }, { unique: true });

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    fullName: this.fullName,
    email: this.email,
    role: this.role,
    createdAt: this.createdAt,
  };
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
