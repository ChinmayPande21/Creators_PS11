import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { apiFetchJson } from "../utils/api";

const STORAGE_KEY = "raggingAlerts";

export const RAGGING_TYPES = [
  "Physical ragging",
  "Verbal ragging",
  "Psychological / emotional ragging",
  "Sexual ragging",
  "Economic ragging",
  "Cyber ragging",
  "Institutional ragging",
  "Discriminatory ragging",
];

export const RAGGING_INTENSITIES = ["Low", "Medium", "High", "Severe"];

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
        raggingType:
          typeof a.raggingType === "string"
            ? a.raggingType
            : "Physical ragging",
        intensity: typeof a.intensity === "string" ? a.intensity : "High",
        photoDataUrl: typeof a.photoDataUrl === "string" ? a.photoDataUrl : "",
        createdAt:
          typeof a.createdAt === "number"
            ? a.createdAt
            : typeof a.createdAt === "string"
              ? Date.parse(a.createdAt) || Date.now()
              : Date.now(),
        createdByEmail:
          typeof a.createdByEmail === "string" ? a.createdByEmail : "",
        createdByName:
          typeof a.createdByName === "string" ? a.createdByName : "",
        createdByRole:
          typeof a.createdByRole === "string" ? a.createdByRole : "",
        status: a.status === "acknowledged" ? "acknowledged" : "pending",
        acknowledgedAt:
          typeof a.acknowledgedAt === "number"
            ? a.acknowledgedAt
            : typeof a.acknowledgedAt === "string"
              ? Date.parse(a.acknowledgedAt) || null
              : null,
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
                  typeof c.createdAt === "number"
                    ? c.createdAt
                    : typeof c.createdAt === "string"
                      ? Date.parse(c.createdAt) || Date.now()
                      : Date.now(),
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
  const { userEmail, userName, userRole, authToken } = useAuth();
  const isWarden = userRole === "warden";

  const [allAlerts, setAllAlerts] = useState(() => loadAlerts());

  const normalizeFromApi = (a) => {
    const createdAt =
      typeof a?.createdAt === "number"
        ? a.createdAt
        : Date.parse(String(a?.createdAt || "")) || Date.now();
    const acknowledgedAt = a?.acknowledgedAt
      ? Date.parse(String(a.acknowledgedAt)) || null
      : null;

    return {
      id: String(a?.id || crypto?.randomUUID?.() || Date.now()),
      location: String(a?.location || ""),
      message: String(a?.message || ""),
      raggingType: String(a?.raggingType || "Physical ragging"),
      intensity: String(a?.intensity || "High"),
      photoDataUrl: typeof a?.photoDataUrl === "string" ? a.photoDataUrl : "",
      createdAt,
      createdByEmail:
        typeof a?.createdByEmail === "string" ? a.createdByEmail : "",
      createdByName:
        typeof a?.createdByName === "string" ? a.createdByName : "",
      createdByRole:
        typeof a?.createdByRole === "string" ? a.createdByRole : "",
      status: a?.status === "acknowledged" ? "acknowledged" : "pending",
      acknowledgedAt,
      acknowledgedByEmail:
        typeof a?.acknowledgedByEmail === "string" ? a.acknowledgedByEmail : "",
      wardenNote: typeof a?.wardenNote === "string" ? a.wardenNote : "",
      wardenPhotoDataUrl:
        typeof a?.wardenPhotoDataUrl === "string" ? a.wardenPhotoDataUrl : "",
      comments: Array.isArray(a?.comments)
        ? a.comments.map((c) => ({
            id: String(c?.id || crypto?.randomUUID?.() || Date.now()),
            text: String(c?.text || ""),
            createdAt:
              typeof c?.createdAt === "number"
                ? c.createdAt
                : Date.parse(String(c?.createdAt || "")) || Date.now(),
            createdByEmail:
              typeof c?.createdByEmail === "string" ? c.createdByEmail : "",
            createdByRole:
              typeof c?.createdByRole === "string" ? c.createdByRole : "",
          }))
        : [],
    };
  };

  useEffect(() => {
    const run = async () => {
      if (!authToken) return;
      try {
        const data = await apiFetchJson("/api/ragging/alerts", {
          token: authToken,
        });
        const fromApi = Array.isArray(data?.alerts)
          ? data.alerts.map(normalizeFromApi)
          : [];
        setAllAlerts(fromApi);
        saveAlerts(fromApi);
      } catch {
        // fall back to localStorage
      }
    };
    run();
    // re-fetch when role changes (warden vs student view)
  }, [authToken, userRole]);

  const alerts = useMemo(() => {
    if (isWarden) return allAlerts;
    const email = (userEmail || "").trim();
    if (!email) return allAlerts.filter((a) => !a.createdByEmail);
    return allAlerts.filter(
      (a) => !a.createdByEmail || a.createdByEmail === email,
    );
  }, [allAlerts, isWarden, userEmail]);

  const createAlert = async ({
    location,
    message,
    raggingType,
    intensity,
    photoDataUrl = "",
  }) => {
    const normalizedLocation = String(location || "").trim();
    const normalizedMessage = String(message || "").trim();
    if (!normalizedLocation || !normalizedMessage) return null;

    const normalizedType = RAGGING_TYPES.includes(raggingType)
      ? raggingType
      : "Physical ragging";
    const normalizedIntensity = RAGGING_INTENSITIES.includes(intensity)
      ? intensity
      : "High";

    const normalizedPhoto =
      typeof photoDataUrl === "string" ? photoDataUrl.trim() : "";

    const id =
      crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    if (authToken) {
      try {
        const data = await apiFetchJson("/api/ragging/alerts", {
          method: "POST",
          token: authToken,
          body: {
            location: normalizedLocation,
            message: normalizedMessage,
            raggingType: normalizedType,
            intensity: normalizedIntensity,
            photoDataUrl: normalizedPhoto,
          },
        });

        const created = normalizeFromApi(data?.alert);
        const next = [created, ...allAlerts];
        setAllAlerts(next);
        saveAlerts(next);
        return created.id;
      } catch {
        // if backend fails, fall back to local
      }
    }

    const next = [
      {
        id,
        location: normalizedLocation,
        message: normalizedMessage,
        raggingType: normalizedType,
        intensity: normalizedIntensity,
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

  const acknowledgeAlert = async (
    id,
    { byEmail = "", wardenNote = "", wardenPhotoDataUrl = "" } = {},
  ) => {
    const by = String(byEmail || "").trim();
    const note = String(wardenNote || "").trim();
    const normalizedWardenPhoto =
      typeof wardenPhotoDataUrl === "string" ? wardenPhotoDataUrl.trim() : "";

    if (authToken) {
      try {
        const data = await apiFetchJson(
          `/api/ragging/alerts/${id}/acknowledge`,
          {
            method: "PATCH",
            token: authToken,
            body: {
              wardenNote: note,
              wardenPhotoDataUrl: normalizedWardenPhoto,
            },
          },
        );

        const updated = normalizeFromApi(data?.alert);
        const next = allAlerts.map((a) => (a.id === id ? updated : a));
        setAllAlerts(next);
        saveAlerts(next);
        return;
      } catch {
        // fall back to local
      }
    }

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

  const addComment = async (id, text) => {
    const normalized = String(text || "").trim();
    if (!normalized) return;

    if (authToken) {
      try {
        const data = await apiFetchJson(`/api/ragging/alerts/${id}/comments`, {
          method: "POST",
          token: authToken,
          body: { text: normalized },
        });

        const updated = normalizeFromApi(data?.alert);
        const next = allAlerts.map((a) => (a.id === id ? updated : a));
        setAllAlerts(next);
        saveAlerts(next);
        return;
      } catch {
        // fall back to local
      }
    }

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
    [alerts, stats, userEmail, userName, userRole, authToken],
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
