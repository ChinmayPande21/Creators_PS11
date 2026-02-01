import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "complaints";
const DEFAULT_TYPE = "Other";

const ComplaintsContext = createContext(null);

const loadComplaints = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((c) => c && typeof c === "object")
      .map((c) => ({
        id:
          typeof c.id === "string"
            ? c.id
            : crypto?.randomUUID?.() || String(Date.now()),
        text: typeof c.text === "string" ? c.text : "",
        type:
          typeof c.type === "string" && c.type.trim()
            ? c.type.trim()
            : DEFAULT_TYPE,
        createdByEmail:
          typeof c.createdByEmail === "string" ? c.createdByEmail : "",
        createdByName:
          typeof c.createdByName === "string" ? c.createdByName : "",
        createdByRole:
          typeof c.createdByRole === "string" ? c.createdByRole : "",
        createdAt: typeof c.createdAt === "number" ? c.createdAt : Date.now(),
        isRead: Boolean(c.isRead),
        readAt: typeof c.readAt === "number" ? c.readAt : null,
        readByEmail: typeof c.readByEmail === "string" ? c.readByEmail : "",
        isResolved: Boolean(c.isResolved),
        resolvedAt: typeof c.resolvedAt === "number" ? c.resolvedAt : null,
        wardenComment:
          typeof c.wardenComment === "string" ? c.wardenComment : "",
        wardenCommentedAt:
          typeof c.wardenCommentedAt === "number" ? c.wardenCommentedAt : null,
        wardenCommentedByEmail:
          typeof c.wardenCommentedByEmail === "string"
            ? c.wardenCommentedByEmail
            : "",
      }))
      .filter((c) => c.text.trim().length > 0);
  } catch {
    return [];
  }
};

const saveComplaints = (complaints) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
};

export const ComplaintsProvider = ({ children }) => {
  const { userEmail, userName, userRole } = useAuth();
  const isWarden = userRole === "warden";

  const [allComplaints, setAllComplaints] = useState(() => loadComplaints());

  const complaints = useMemo(() => {
    if (isWarden) return allComplaints;
    const email = (userEmail || "").trim();
    if (!email) {
      // If we don't know who the student is, fall back to showing only items
      // without ownership (legacy data).
      return allComplaints.filter((c) => !c.createdByEmail);
    }
    return allComplaints.filter(
      (c) => !c.createdByEmail || c.createdByEmail === email,
    );
  }, [allComplaints, isWarden, userEmail]);

  const addComplaint = (text, type = DEFAULT_TYPE) => {
    const normalizedText = String(text || "").trim();
    if (!normalizedText) return null;

    const normalizedType = String(type || "").trim() || DEFAULT_TYPE;

    const id =
      crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const next = [
      {
        id,
        text: normalizedText,
        type: normalizedType,
        createdByEmail: (userEmail || "").trim(),
        createdByName: (userName || "").trim(),
        createdByRole: (userRole || "").trim(),
        createdAt: Date.now(),
        isRead: false,
        readAt: null,
        readByEmail: "",
        isResolved: false,
        resolvedAt: null,
        wardenComment: "",
        wardenCommentedAt: null,
        wardenCommentedByEmail: "",
      },
      ...allComplaints,
    ];

    setAllComplaints(next);
    saveComplaints(next);
    return id;
  };

  const setComplaintRead = (id, isRead = true, byEmail = "") => {
    const next = allComplaints.map((c) => {
      if (c.id !== id) return c;
      const read = Boolean(isRead);
      return {
        ...c,
        isRead: read,
        readAt: read ? Date.now() : null,
        readByEmail: read ? String(byEmail || "").trim() : "",
      };
    });
    setAllComplaints(next);
    saveComplaints(next);
  };

  const setComplaintResolved = (id, isResolved = true) => {
    const next = allComplaints.map((c) => {
      if (c.id !== id) return c;
      const resolved = Boolean(isResolved);
      return {
        ...c,
        isResolved: resolved,
        resolvedAt: resolved ? Date.now() : null,
      };
    });
    setAllComplaints(next);
    saveComplaints(next);
  };

  const setComplaintWardenComment = (id, comment, byEmail = "") => {
    const normalized = String(comment || "").trim();
    const next = allComplaints.map((c) => {
      if (c.id !== id) return c;
      return {
        ...c,
        wardenComment: normalized,
        wardenCommentedAt: normalized ? Date.now() : null,
        wardenCommentedByEmail: normalized ? String(byEmail || "").trim() : "",
      };
    });
    setAllComplaints(next);
    saveComplaints(next);
  };

  const clearComplaints = () => {
    setAllComplaints([]);
    saveComplaints([]);
  };

  const stats = useMemo(() => {
    const total = complaints.length;
    const unread = complaints.filter((c) => !c.isRead).length;
    const read = total - unread;
    const resolved = complaints.filter((c) => c.isResolved).length;
    const unresolved = total - resolved;
    const resolvedRate = total === 0 ? 0 : Math.round((resolved / total) * 100);
    return { total, unread, read, resolved, unresolved, resolvedRate };
  }, [complaints]);

  const value = useMemo(
    () => ({
      complaints,
      stats,
      addComplaint,
      setComplaintRead,
      setComplaintResolved,
      setComplaintWardenComment,
      clearComplaints,
    }),
    [complaints, stats, userEmail, userName, userRole],
  );

  return (
    <ComplaintsContext.Provider value={value}>
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => {
  const ctx = useContext(ComplaintsContext);
  if (!ctx)
    throw new Error("useComplaints must be used within a ComplaintsProvider");
  return ctx;
};
