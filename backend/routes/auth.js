import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const router = express.Router();

const ALLOWED_ROLES = new Set(["student", "warden"]);

const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  // simple, practical check
  return /^\S+@\S+\.\S+$/.test(email.trim());
};

const requireJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error("JWT_SECRET is not set");
    err.statusCode = 500;
    throw err;
  }
  return secret;
};

const tokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "7d";

const signToken = (user) => {
  const secret = requireJwtSecret();
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      email: user.email,
      fullName: user.fullName,
    },
    secret,
    { expiresIn: tokenExpiresIn },
  );
};

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body || {};

    if (typeof fullName !== "string" || !fullName.trim()) {
      res.status(400).json({ ok: false, error: "Full name is required" });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ ok: false, error: "Valid email is required" });
      return;
    }

    if (typeof password !== "string" || password.length < 8) {
      res
        .status(400)
        .json({ ok: false, error: "Password must be at least 8 characters" });
      return;
    }

    const normalizedRole = role === "warden" ? "warden" : "student";
    if (!ALLOWED_ROLES.has(normalizedRole)) {
      res.status(400).json({ ok: false, error: "Invalid role" });
      return;
    }

    const existing = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (existing) {
      res.status(409).json({
        ok: false,
        error: "User already exists. Please login.",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      role: normalizedRole,
      passwordHash,
    });

    const token = signToken(user);

    res.status(201).json({
      ok: true,
      token,
      user: user.toSafeJSON(),
    });
  } catch (err) {
    if (err?.code === 11000) {
      res.status(409).json({ ok: false, error: "User already exists" });
      return;
    }

    const statusCode = err?.statusCode || 500;
    res.status(statusCode).json({
      ok: false,
      error: statusCode === 500 ? "Signup failed" : String(err.message || err),
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!isValidEmail(email)) {
      res.status(400).json({ ok: false, error: "Valid email is required" });
      return;
    }

    if (typeof password !== "string" || !password) {
      res.status(400).json({ ok: false, error: "Password is required" });
      return;
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      res.status(401).json({ ok: false, error: "Invalid credentials" });
      return;
    }

    const token = signToken(user);

    res.json({
      ok: true,
      token,
      user: user.toSafeJSON(),
    });
  } catch (err) {
    const statusCode = err?.statusCode || 500;
    res.status(statusCode).json({
      ok: false,
      error: statusCode === 500 ? "Login failed" : String(err.message || err),
    });
  }
});

export default router;
