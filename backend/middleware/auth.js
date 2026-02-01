import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  try {
    const header = String(req.headers.authorization || "");
    const match = header.match(/^Bearer\s+(.+)$/i);
    if (!match) {
      res.status(401).json({ ok: false, error: "Missing auth token" });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ ok: false, error: "JWT_SECRET is not set" });
      return;
    }

    const payload = jwt.verify(match[1], secret);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
};

export const requireRole = (roles) => (req, res, next) => {
  const role = req.user?.role;
  if (!roles.includes(role)) {
    res.status(403).json({ ok: false, error: "Forbidden" });
    return;
  }
  next();
};
