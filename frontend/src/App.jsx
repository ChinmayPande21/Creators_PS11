import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import Complaints from "./pages/Complaints";
import Payments from "./pages/Payments";
import Hostels from "./pages/Hostels";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { PortfolioProvider } from "./context/PortfolioContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ComplaintsProvider } from "./context/ComplaintsContext";
import { PaymentsProvider } from "./context/PaymentsContext";
import { RaggingAlertsProvider } from "./context/RaggingAlertsContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const RoleRoute = ({ allow, redirectTo = "/dashboard", children }) => {
  const { userRole } = useAuth();
  if (!allow.includes(userRole)) return <Navigate to={redirectTo} replace />;
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

const AppShell = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <PortfolioProvider>
        <ComplaintsProvider>
          <PaymentsProvider>
            <RaggingAlertsProvider>
              <NavigationBar />
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />

                <Route
                  path="/login"
                  element={
                    <PublicOnlyRoute>
                      <Login />
                    </PublicOnlyRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicOnlyRoute>
                      <SignUp />
                    </PublicOnlyRoute>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/complaints"
                  element={
                    <ProtectedRoute>
                      <Complaints />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payments"
                  element={
                    <ProtectedRoute>
                      <Payments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/hostels"
                  element={
                    <ProtectedRoute>
                      <RoleRoute allow={["student"]}>
                        <Hostels />
                      </RoleRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <ProtectedRoute>
                      <Portfolio />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              {isAuthenticated && <Footer />}
            </RaggingAlertsProvider>
          </PaymentsProvider>
        </ComplaintsProvider>
      </PortfolioProvider>
    </div>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </Router>
  );
}

export default App;
