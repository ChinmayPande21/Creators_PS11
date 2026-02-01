import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, userRole, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle = {
    background: scrolled
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    borderBottom: scrolled ? "1px solid rgba(139, 92, 246, 0.2)" : "none",
    boxShadow: scrolled
      ? "0 8px 32px rgba(139, 92, 246, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)"
      : "none",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    padding: scrolled ? "0.4rem 0" : "0.8rem 0",
    zIndex: 1050,
  };

  const brandStyle = {
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontSize: scrolled ? "1.5rem" : "1.85rem",
    transition: "all 0.4s ease",
    fontWeight: "900",
    letterSpacing: "-1px",
    backgroundSize: "200% 200%",
    animation: "gradientShift 3s ease infinite",
  };

  const iconContainerStyle = {
    width: scrolled ? "42px" : "48px",
    height: scrolled ? "42px" : "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    transition: "all 0.4s ease",
  };

  const navLinkStyle = {
    position: "relative",
    padding: "0.6rem 1.2rem",
    margin: "0 0.2rem",
    borderRadius: "12px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontWeight: "600",
    fontSize: "0.95rem",
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <style>
        {`
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          .navbar-glass {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            pointer-events: auto;
          }

          .navbar-glass::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }

          .navbar-glass:hover::before {
            opacity: 1;
          }

          .nav-link-custom {
            position: relative;
            overflow: hidden;
            pointer-events: auto;
            cursor: pointer;
          }

          .nav-link-custom::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateX(-50%);
            border-radius: 2px;
          }
          
          .nav-link-custom::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            border-radius: 12px;
          }
          
          .nav-link-custom:hover::before,
          .nav-link-custom.active::before {
            width: 70%;
          }
          
          .nav-link-custom:hover::after {
            opacity: 1;
          }
          
          .nav-link-custom:hover {
            background: rgba(139, 92, 246, 0.1);
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
          }
          
          .nav-link-custom.active {
            background: rgba(139, 92, 246, 0.15);
            color: #8b5cf6 !important;
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
          }
          
          .btn-login {
            border-radius: 12px;
            padding: 0.6rem 1.8rem;
            font-weight: 700;
            border: none;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            letter-spacing: 0.5px;
            pointer-events: auto;
            cursor: pointer;
          }
          
          .btn-login::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 0;
          }
          
          .btn-login:hover {
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
          
          .btn-login:hover::before {
            left: 100%;
          }

          .btn-login-warden {
            border-radius: 12px;
            padding: 0.6rem 1.4rem;
            font-weight: 800;
            border: none;
            background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
            color: white;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 15px rgba(15, 23, 42, 0.25);
            pointer-events: auto;
            cursor: pointer;
          }

          .btn-login-warden:hover {
            color: white !important;
            transform: translateY(-2px);
            box-shadow: 0 10px 26px rgba(15, 23, 42, 0.35);
            background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
          }
          
          .btn-signup {
            border-radius: 12px;
            padding: 0.6rem 1.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            position: relative;
            overflow: hidden;
            letter-spacing: 0.5px;
            pointer-events: auto;
            cursor: pointer;
          }
          
          .btn-signup::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          
          .btn-signup:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
          
          .btn-signup:hover::before {
            width: 300px;
            height: 300px;
          }
          
          .btn-signup .rocket-icon {
            display: inline-block;
            transition: transform 0.4s ease;
          }
          
          .btn-signup:hover .rocket-icon {
            transform: translateX(4px) translateY(-4px) rotate(-15deg);
          }

          .btn-logout {
            border-radius: 12px;
            padding: 0.6rem 1.4rem;
            font-weight: 800;
            border: 1px solid rgba(239, 68, 68, 0.25);
            background: rgba(239, 68, 68, 0.08);
            color: #b91c1c;
            transition: all 0.3s ease;
          }

          .btn-logout:hover {
            transform: translateY(-2px);
            background: rgba(239, 68, 68, 0.12);
            border-color: rgba(239, 68, 68, 0.35);
          }

          .role-pill {
            border-radius: 999px;
            padding: 0.55rem 0.85rem;
            font-weight: 800;
            border: 1px solid rgba(139, 92, 246, 0.25);
            background: rgba(139, 92, 246, 0.10);
            color: #5b21b6;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            cursor: default;
          }
          
          .theme-toggle {
            display: none;
          }
          
          .navbar-toggler-custom {
            border: 2px solid rgba(139, 92, 246, 0.3);
            background: rgba(139, 92, 246, 0.08);
            border-radius: 12px;
            padding: 0.6rem;
            transition: all 0.3s ease;
          }
          
          .navbar-toggler-custom:hover {
            background: rgba(139, 92, 246, 0.15);
            transform: scale(1.05);
            border-color: rgba(139, 92, 246, 0.5);
          }
          
          .navbar-toggler-custom:focus {
            box-shadow: 0 0 0 0.3rem rgba(139, 92, 246, 0.3);
          }
          
          .brand-logo-wrapper {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.3rem 0.5rem;
            border-radius: 16px;
            background: rgba(139, 92, 246, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(139, 92, 246, 0.15);
            box-shadow: 0 2px 8px rgba(139, 92, 246, 0.1);
          }
          
          .brand-logo-wrapper:hover {
            background: rgba(139, 92, 246, 0.12);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
            border-color: rgba(139, 92, 246, 0.3);
          }
          
          .brand-icon-container {
            animation: float 3s ease-in-out infinite;
          }
          
          .brand-icon-container:hover {
            animation: none;
            transform: rotate(-10deg) scale(1.1);
          }
          
          @media (max-width: 991px) {
            .navbar-collapse {
              background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.98) 100%);
              backdrop-filter: blur(20px);
              border-radius: 16px;
              margin-top: 1rem;
              padding: 1.5rem;
              box-shadow: 0 8px 32px rgba(139, 92, 246, 0.2);
              border: 1px solid rgba(139, 92, 246, 0.2);
              pointer-events: auto;
            }
          }
          
          .nav-icon-btn {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            border: 1px solid rgba(139, 92, 246, 0.22);
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 6px 18px rgba(102, 126, 234, 0.12);
          }

          .nav-icon-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 24px rgba(102, 126, 234, 0.18);
            border-color: rgba(139, 92, 246, 0.35);
          }
          
          .navbar-sticky {
            z-index: 1050;
            pointer-events: auto;
          }
          
          .navbar-sticky * {
            pointer-events: auto;
          }
        `}
      </style>

      <Navbar
        expand="lg"
        className="navbar-glass navbar-sticky"
        style={navbarStyle}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        onSelect={() => setExpanded(false)}
      >
        <Container fluid className="px-3 px-md-4">
          <Navbar.Brand
            as={Link}
            to="/dashboard"
            onClick={() => setExpanded(false)}
            className="brand-logo-wrapper"
          >
            <div style={iconContainerStyle} className="brand-icon-container">
              <i
                className="bi bi-shield-check text-white"
                style={{ fontSize: scrolled ? "1.3rem" : "1.5rem" }}
              ></i>
            </div>
            <span style={brandStyle}>ClearFix</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="navbar-toggler-custom"
          >
            <i
              className={`bi ${expanded ? "bi-x-lg" : "bi-list"}`}
              style={{ color: "#1a202c" }}
            ></i>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-1">
              {isAuthenticated && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/dashboard"
                    className={`nav-link-custom ${isActive("/dashboard") ? "active" : ""}`}
                    onClick={() => setExpanded(false)}
                    style={{
                      ...navLinkStyle,
                      color: "#1a202c",
                    }}
                  >
                    <i className="bi bi-speedometer2 me-2"></i>Dashboard
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/complaints"
                    className={`nav-link-custom ${isActive("/complaints") ? "active" : ""}`}
                    onClick={() => setExpanded(false)}
                    style={{
                      ...navLinkStyle,
                      color: "#1a202c",
                    }}
                  >
                    <i className="bi bi-chat-left-text me-2"></i>Complaints
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/payments"
                    className={`nav-link-custom ${isActive("/payments") ? "active" : ""}`}
                    onClick={() => setExpanded(false)}
                    style={{
                      ...navLinkStyle,
                      color: "#1a202c",
                    }}
                  >
                    <i className="bi bi-credit-card me-2"></i>Payments
                  </Nav.Link>

                  {userRole === "student" && (
                    <Nav.Link
                      as={Link}
                      to="/hostels"
                      className={`nav-link-custom ${isActive("/hostels") ? "active" : ""}`}
                      onClick={() => setExpanded(false)}
                      style={{
                        ...navLinkStyle,
                        color: "#1a202c",
                      }}
                    >
                      <i className="bi bi-buildings me-2"></i>Hostels
                    </Nav.Link>
                  )}

                  <Nav.Link
                    as={Link}
                    to="/analytics"
                    className={`nav-link-custom ${isActive("/analytics") ? "active" : ""}`}
                    onClick={() => setExpanded(false)}
                    style={{
                      ...navLinkStyle,
                      color: "#1a202c",
                    }}
                  >
                    <i className="bi bi-graph-up-arrow me-2"></i>Analytics
                  </Nav.Link>

                  <Nav.Link
                    href="#contact"
                    className="nav-link-custom"
                    onClick={() => setExpanded(false)}
                    style={{
                      ...navLinkStyle,
                      color: "#1a202c",
                    }}
                  >
                    <i className="bi bi-envelope me-2"></i>Contact
                  </Nav.Link>
                </>
              )}

              <div className="d-flex gap-2 mt-3 mt-lg-0 align-items-center ms-lg-3">
                {/* Right-side controls */}
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="link"
                      className="nav-icon-btn text-decoration-none"
                      aria-label="Account"
                      onClick={() => setExpanded(false)}
                    >
                      <i
                        className="bi bi-person"
                        style={{ color: "#1a202c", fontSize: "1.3rem" }}
                      ></i>
                    </Button>

                    <span className="role-pill">
                      <i className="bi bi-person-badge"></i>
                      {userRole === "warden" ? "Warden" : "Student"}
                    </span>

                    <Button
                      className="btn-logout"
                      onClick={() => {
                        logout();
                        setExpanded(false);
                      }}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/login?role=student"
                      onClick={() => setExpanded(false)}
                      className="btn-login"
                    >
                      <i className="bi bi-mortarboard me-2"></i>Student Login
                    </Button>

                    <Button
                      as={Link}
                      to="/login?role=warden"
                      onClick={() => setExpanded(false)}
                      className="btn-login-warden"
                    >
                      <i className="bi bi-shield-lock me-2"></i>Warden Login
                    </Button>

                    <Button
                      as={Link}
                      to="/signup?role=student"
                      onClick={() => setExpanded(false)}
                      className="btn-signup"
                    >
                      <i className="bi bi-rocket-takeoff me-2 rocket-icon"></i>
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
