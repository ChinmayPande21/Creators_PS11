import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [userRole, setUserRole] = useState(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "student" || savedRole === "warden") return savedRole;
    return localStorage.getItem("isAuthenticated") === "true" ? "student" : "";
  });

  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem("userEmail") || "";
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  const login = (email, name, role = "student") => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    if (email) localStorage.setItem("userEmail", email);
    if (name) localStorage.setItem("userName", name);
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email || "");
    setUserName(name || "");
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserRole("");
    setUserEmail("");
    setUserName("");
  };

  const value = useMemo(
    () => ({ isAuthenticated, userRole, userEmail, userName, login, logout }),
    [isAuthenticated, userRole, userEmail, userName],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
