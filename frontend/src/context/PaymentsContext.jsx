import React, { createContext, useContext, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const STORAGE_KEY = "payments";

const PaymentsContext = createContext(null);

const loadPayments = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((p) => p && typeof p === "object")
      .map((p) => ({
        id:
          typeof p.id === "string"
            ? p.id
            : crypto?.randomUUID?.() || String(Date.now()),
        paymentType: typeof p.paymentType === "string" ? p.paymentType : "",
        months: typeof p.months === "number" ? p.months : 1,
        total: typeof p.total === "number" ? p.total : 0,
        paymentMode: typeof p.paymentMode === "string" ? p.paymentMode : "",
        note: typeof p.note === "string" ? p.note : "",
        createdAt: typeof p.createdAt === "number" ? p.createdAt : Date.now(),
        createdByEmail:
          typeof p.createdByEmail === "string" ? p.createdByEmail : "",
        createdByName:
          typeof p.createdByName === "string" ? p.createdByName : "",
        createdByRole:
          typeof p.createdByRole === "string" ? p.createdByRole : "",
        status: p.status === "done" ? "done" : "pending",
        doneAt: typeof p.doneAt === "number" ? p.doneAt : null,
        doneByEmail: typeof p.doneByEmail === "string" ? p.doneByEmail : "",
      }))
      .filter((p) => p.total > 0);
  } catch {
    return [];
  }
};

const savePayments = (payments) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
};

export const PaymentsProvider = ({ children }) => {
  const { userEmail, userName, userRole } = useAuth();
  const isWarden = userRole === "warden";

  const [allPayments, setAllPayments] = useState(() => loadPayments());

  const payments = useMemo(() => {
    if (isWarden) return allPayments;
    const email = (userEmail || "").trim();
    if (!email) return allPayments.filter((p) => !p.createdByEmail);
    return allPayments.filter(
      (p) => !p.createdByEmail || p.createdByEmail === email,
    );
  }, [allPayments, isWarden, userEmail]);

  const createPayment = ({ paymentType, months, total, paymentMode, note }) => {
    const safeTotal = Number(total);
    if (!Number.isFinite(safeTotal) || safeTotal <= 0) return null;

    const id =
      crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const next = [
      {
        id,
        paymentType: String(paymentType || "").trim() || "Monthly",
        months: Math.min(12, Math.max(1, Number(months) || 1)),
        total: Math.round(safeTotal),
        paymentMode: String(paymentMode || "").trim() || "UPI",
        note: String(note || "").trim(),
        createdAt: Date.now(),
        createdByEmail: (userEmail || "").trim(),
        createdByName: (userName || "").trim(),
        createdByRole: (userRole || "").trim(),
        status: "pending",
        doneAt: null,
        doneByEmail: "",
      },
      ...allPayments,
    ];

    setAllPayments(next);
    savePayments(next);
    return id;
  };

  const setPaymentStatus = (id, status, byEmail = "") => {
    const nextStatus = status === "done" ? "done" : "pending";
    const by = String(byEmail || "").trim();

    const next = allPayments.map((p) => {
      if (p.id !== id) return p;

      if (nextStatus === "done") {
        return {
          ...p,
          status: "done",
          doneAt: Date.now(),
          doneByEmail: by,
        };
      }

      return {
        ...p,
        status: "pending",
        doneAt: null,
        doneByEmail: "",
      };
    });

    setAllPayments(next);
    savePayments(next);
  };

  const stats = useMemo(() => {
    const total = payments.length;
    const pending = payments.filter((p) => p.status !== "done").length;
    const done = total - pending;
    return { total, pending, done };
  }, [payments]);

  const value = useMemo(
    () => ({ payments, stats, createPayment, setPaymentStatus }),
    [payments, stats, userEmail, userName, userRole],
  );

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};

export const usePayments = () => {
  const ctx = useContext(PaymentsContext);
  if (!ctx)
    throw new Error("usePayments must be used within a PaymentsProvider");
  return ctx;
};
