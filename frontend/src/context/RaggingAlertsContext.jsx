import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "raggingAlerts";

const RaggingAlertsContext = createContext(null);

const loadAlerts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((a) => a && typeof a === "object")
      .map((a) => ({
        id:
          typeof a.id === "string"
            ? a.id
            : crypto?.randomUUID?.() || String(Date.now()),
        location: typeof a.location === "string" ? a.location : "",
        message: typeof a.message === "string" ? a.message : "",
        photoDataUrl: typeof a.photoDataUrl === "string" ? a.photoDataUrl : "",
        createdAt: typeof a.createdAt === "number" ? a.createdAt : Date.now(),
        createdByEmail:
          typeof a.createdByEmail === "string" ? a.createdByEmail : "",
        createdByName:
          typeof a.createdByName === "string" ? a.createdByName : "",
        createdByRole:
          typeof a.createdByRole === "string" ? a.createdByRole : "",
        status: a.status === "acknowledged" ? "acknowledged" : "pending",
        acknowledgedAt:
          typeof a.acknowledgedAt === "number" ? a.acknowledgedAt : null,
        acknowledgedByEmail:
          typeof a.acknowledgedByEmail === "string"
            ? a.acknowledgedByEmail
            : "",
        wardenNote: typeof a.wardenNote === "string" ? a.wardenNote : "",
        wardenPhotoDataUrl:
          typeof a.wardenPhotoDataUrl === "string" ? a.wardenPhotoDataUrl : "",
        comments: Array.isArray(a.comments)
          ? a.comments
              .filter((c) => c && typeof c === "object")
              .map((c) => ({
                id:
                  typeof c.id === "string"
                    ? c.id
                    : crypto?.randomUUID?.() || String(Date.now()),
                text: typeof c.text === "string" ? c.text : "",
                createdAt:
                  typeof c.createdAt === "number" ? c.createdAt : Date.now(),
                createdByEmail:
                  typeof c.createdByEmail === "string" ? c.createdByEmail : "",
                createdByRole:
                  typeof c.createdByRole === "string" ? c.createdByRole : "",
              }))
              .filter((c) => c.text.trim())
          : [],
      }))
      .filter((a) => a.location.trim() && a.message.trim());
  } catch {
    return [];
  }
};

const saveAlerts = (alerts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
};

export const RaggingAlertsProvider = ({ children }) => {
  const { userEmail, userName, userRole } = useAuth();
  const isWarden = userRole === "warden";

  const [allAlerts, setAllAlerts] = useState(() => loadAlerts());

  const alerts = useMemo(() => {
    if (isWarden) return allAlerts;
    const email = (userEmail || "").trim();
    if (!email) return allAlerts.filter((a) => !a.createdByEmail);
    return allAlerts.filter(
      (a) => !a.createdByEmail || a.createdByEmail === email,
    );
  }, [allAlerts, isWarden, userEmail]);

  const createAlert = ({ location, message, photoDataUrl = "" }) => {
    const normalizedLocation = String(location || "").trim();
    const normalizedMessage = String(message || "").trim();
    if (!normalizedLocation || !normalizedMessage) return null;

    const normalizedPhoto =
      typeof photoDataUrl === "string" ? photoDataUrl.trim() : "";

    const id =
      crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const next = [
      {
        id,
        location: normalizedLocation,
        message: normalizedMessage,
        photoDataUrl: normalizedPhoto,
        createdAt: Date.now(),
        createdByEmail: (userEmail || "").trim(),
        createdByName: (userName || "").trim(),
        createdByRole: (userRole || "").trim(),
        status: "pending",
        acknowledgedAt: null,
        acknowledgedByEmail: "",
        wardenNote: "",
        comments: [],
      },
      ...allAlerts,
    ];

    setAllAlerts(next);
    saveAlerts(next);
    return id;
  };

  const acknowledgeAlert = (
    id,
    { byEmail = "", wardenNote = "", wardenPhotoDataUrl = "" } = {},
  ) => {
    const by = String(byEmail || "").trim();
    const note = String(wardenNote || "").trim();
    const normalizedWardenPhoto =
      typeof wardenPhotoDataUrl === "string" ? wardenPhotoDataUrl.trim() : "";

    const next = allAlerts.map((a) => {
      if (a.id !== id) return a;
      return {
        ...a,
        status: "acknowledged",
        acknowledgedAt: Date.now(),
        acknowledgedByEmail: by,
        wardenNote: note,
        wardenPhotoDataUrl: normalizedWardenPhoto,
      };
    });

    setAllAlerts(next);
    saveAlerts(next);
  };

  const addComment = (id, text) => {
    const normalized = String(text || "").trim();
    if (!normalized) return;

    const commentId =
      crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const next = allAlerts.map((a) => {
      if (a.id !== id) return a;
      const existingComments = Array.isArray(a.comments) ? a.comments : [];
      return {
        ...a,
        comments: [
          ...existingComments,
          {
            id: commentId,
            text: normalized,
            createdAt: Date.now(),
            createdByEmail: (userEmail || "").trim(),
            createdByRole: (userRole || "").trim(),
          },
        ],
      };
    });

    setAllAlerts(next);
    saveAlerts(next);
  };

  const stats = useMemo(() => {
    const total = alerts.length;
    const pending = alerts.filter((a) => a.status !== "acknowledged").length;
    const acknowledged = total - pending;
    return { total, pending, acknowledged };
  }, [alerts]);

  const value = useMemo(
    () => ({ alerts, stats, createAlert, acknowledgeAlert, addComment }),
    [alerts, stats, userEmail, userName, userRole],
  );

  return (
    <RaggingAlertsContext.Provider value={value}>
      {children}
    </RaggingAlertsContext.Provider>
  );
};

export const useRaggingAlerts = () => {
  const ctx = useContext(RaggingAlertsContext);
  if (!ctx)
    throw new Error(
      "useRaggingAlerts must be used within a RaggingAlertsProvider",
    );
  return ctx;
};
