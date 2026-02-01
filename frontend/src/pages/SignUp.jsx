import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetchJson } from "../utils/api";

const buildRememberKey = (role) => `clearfix.rememberedLogin.${role}`;

const writeRememberedLogin = (role, { email, password }) => {
  try {
    localStorage.setItem(
      buildRememberKey(role),
      JSON.stringify({ email: email || "", password: password || "" }),
    );
  } catch {
    // ignore storage quota / unavailable
  }
};

const clearRememberedLogin = (role) => {
  try {
    localStorage.removeItem(buildRememberKey(role));
  } catch {
    // ignore
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [role, setRole] = useState(() => {
    return searchParams.get("role") === "warden" ? "warden" : "student";
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const qpRole = searchParams.get("role");
    setRole(qpRole === "warden" ? "warden" : "student");
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (submitError) setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetchJson("/api/auth/signup", {
        method: "POST",
        body: {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role,
        },
      });

      if (formData.rememberMe) {
        writeRememberedLogin(role, {
          email: formData.email,
          password: formData.password,
        });
      } else {
        clearRememberedLogin(role);
      }

      login(
        data?.user?.email,
        data?.user?.fullName,
        data?.user?.role,
        data?.token,
      );
      navigate("/dashboard");
    } catch (err) {
      setSubmitError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    paddingTop: "100px",
    paddingBottom: "80px",
    position: "relative",
    overflow: "hidden",
  };

  const floatingShapeStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.1)",
    animation: "float 6s ease-in-out infinite",
  };

  const cardStyle = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    borderRadius: "25px",
    border: "1px solid rgba(17, 153, 142, 0.15)",
    boxShadow:
      "0 20px 60px rgba(17, 153, 142, 0.15), 0 0 40px rgba(56, 239, 125, 0.08)",
    transition: "all 0.4s ease",
  };

  const inputStyle = {
    borderRadius: "14px",
    padding: "14px 18px",
    border: "2px solid rgba(17, 153, 142, 0.2)",
    background: "rgba(248, 250, 252, 0.8)",
    transition: "all 0.4s ease",
    fontSize: "15px",
    fontWeight: "500",
    color: "#2d3748",
  };

  const buttonStyle = {
    borderRadius: "14px",
    padding: "14px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    border: "none",
    color: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(17, 153, 142, 0.3)",
    letterSpacing: "0.5px",
  };

  const socialButtonStyle = {
    borderRadius: "14px",
    padding: "12px",
    border: "2px solid rgba(17, 153, 142, 0.15)",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
    transition: "all 0.4s ease",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return null;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div style={pageStyle}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          @keyframes slideInDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          .signup-card {
            animation: slideInUp 0.8s ease-out;
          }
          
          .signup-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(17, 153, 142, 0.3) !important;
          }
          
          .form-control:focus {
            border-color: #11998e !important;
            background: rgba(248, 250, 252, 1) !important;
            box-shadow: 0 0 0 0.3rem rgba(17, 153, 142, 0.15), inset 0 0 0 1px rgba(17, 153, 142, 0.1) !important;
            transform: translateY(-2px);
          }
          
          .form-label {
            font-size: 13px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            font-weight: 700 !important;
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px !important;
          }
          
          .form-check-label {
            font-size: 13px !important;
            color: #4a5568 !important;
            font-weight: 500 !important;
          }
          
          .btn-signup {
            position: relative;
            overflow: hidden;
          }
          
          .btn-signup::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.5s ease;
            z-index: 1;
          }
          
          .btn-signup:hover::before {
            left: 100%;
          }
          
          .btn-signup:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 35px rgba(17, 153, 142, 0.5), 0 0 20px rgba(56, 239, 125, 0.2);
            background: linear-gradient(135deg, #38ef7d 0%, #11998e 100%);
          }
          
          .btn-signup:active {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(17, 153, 142, 0.3);
          }
          
          .feature-badge {
            display: inline-block;
            padding: 6px 12px;
            background: linear-gradient(135deg, rgba(17, 153, 142, 0.1) 0%, rgba(56, 239, 125, 0.1) 100%);
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: #11998e;
            margin: 0 4px 8px 0;
            border: 1px solid rgba(17, 153, 142, 0.2);
            animation: slideInDown 0.8s ease-out;
          }
          
          .feature-badge:nth-child(1) { animation-delay: 0.3s; }
          .feature-badge:nth-child(2) { animation-delay: 0.4s; }
          .feature-badge:nth-child(3) { animation-delay: 0.5s; }
          
          .icon-badge {
            animation: slideInDown 0.8s ease-out 0.1s both;
          }
          
          .form-group {
            animation: slideInUp 0.8s ease-out;
          }
          
          .form-group:nth-child(1) { animation-delay: 0.2s; }
          .form-group:nth-child(2) { animation-delay: 0.3s; }
          .form-group:nth-child(3) { animation-delay: 0.4s; }
          .form-group:nth-child(4) { animation-delay: 0.5s; }
          .form-group:nth-child(5) { animation-delay: 0.6s; }
          
          .btn-signup:active {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(17, 153, 142, 0.4);
          }
          
          .social-btn:hover {
            border-color: #11998e;
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 8px 20px rgba(17, 153, 142, 0.2), 0 0 15px rgba(56, 239, 125, 0.1);
            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%);
          }
          
          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #11998e;
            z-index: 10;
            transition: all 0.3s ease;
          }
          
          .password-toggle:hover {
            color: #38ef7d;
            transform: translateY(-50%) scale(1.2);
          }
          
          .link-hover {
            transition: all 0.3s ease;
          }
          
          .link-hover:hover {
            color: #38ef7d !important;
            transform: translateX(5px);
          }
          
          .password-strength-bar {
            height: 4px;
            border-radius: 2px;
            transition: all 0.3s ease;
            margin-top: 8px;
          }
        `}
      </style>

      {/* Floating background shapes */}
      <div
        style={{
          ...floatingShapeStyle,
          width: "300px",
          height: "300px",
          top: "10%",
          left: "5%",
          animationDelay: "0s",
        }}
      ></div>
      <div
        style={{
          ...floatingShapeStyle,
          width: "200px",
          height: "200px",
          bottom: "15%",
          right: "10%",
          animationDelay: "2s",
        }}
      ></div>
      <div
        style={{
          ...floatingShapeStyle,
          width: "150px",
          height: "150px",
          top: "60%",
          left: "15%",
          animationDelay: "4s",
        }}
      ></div>

      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={6}>
            <Card style={cardStyle} className="signup-card">
              <Card.Body className="p-4">
                {/* Header */}
                <div className="text-center mb-3">
                  <div
                    className="icon-badge"
                    style={{
                      width: "60px",
                      height: "60px",
                      background:
                        "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 15px",
                      boxShadow: "0 5px 15px rgba(17, 153, 142, 0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <i
                      className="bi bi-person-plus-fill text-white"
                      style={{ fontSize: "28px" }}
                    ></i>
                  </div>
                  <h2
                    className="fw-bold mb-1"
                    style={{
                      color: "#2d3748",
                      fontSize: "28px",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Create Your Account
                  </h2>
                  <p
                    className="text-muted"
                    style={{ fontSize: "14px", marginBottom: "15px" }}
                  >
                    Join FineEdge and start your financial journey
                  </p>

                  {/* Feature badges */}
                  <div className="mt-2">
                    <span className="feature-badge">
                      <i className="bi bi-shield-check me-2"></i>Secure
                    </span>
                    <span className="feature-badge">
                      <i className="bi bi-lightning-charge me-2"></i>Fast Setup
                    </span>
                    <span className="feature-badge">
                      <i className="bi bi-star-fill me-2"></i>Free
                    </span>
                  </div>
                </div>

                {submitError ? (
                  <Alert
                    variant="danger"
                    className="mb-3"
                    style={{ borderRadius: "14px" }}
                  >
                    {submitError}
                  </Alert>
                ) : null}

                <Form onSubmit={handleSubmit}>
                  <div className="d-flex gap-2 mb-3">
                    <Button
                      type="button"
                      onClick={() => setRole("student")}
                      variant={
                        role === "student" ? "success" : "outline-success"
                      }
                      style={{
                        borderRadius: "12px",
                        fontWeight: 800,
                        padding: "10px 14px",
                        borderWidth: 2,
                      }}
                    >
                      <i className="bi bi-mortarboard me-2"></i>
                      Student
                    </Button>

                    <Button
                      type="button"
                      onClick={() => setRole("warden")}
                      variant={role === "warden" ? "dark" : "outline-dark"}
                      style={{
                        borderRadius: "12px",
                        fontWeight: 800,
                        padding: "10px 14px",
                        borderWidth: 2,
                      }}
                    >
                      <i className="bi bi-shield-lock me-2"></i>
                      Warden
                    </Button>
                  </div>

                  <Form.Group className="mb-2">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#4a5568",
                        fontSize: "13px",
                      }}
                    >
                      <i className="bi bi-person me-2"></i>Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      isInvalid={!!errors.fullName}
                      style={inputStyle}
                      size="sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#4a5568",
                        fontSize: "13px",
                      }}
                    >
                      <i className="bi bi-envelope me-2"></i>Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      style={inputStyle}
                      size="sm"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2" style={{ position: "relative" }}>
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#4a5568",
                        fontSize: "13px",
                      }}
                    >
                      <i className="bi bi-shield-lock me-2"></i>Password
                    </Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      style={inputStyle}
                      size="sm"
                    />
                    <i
                      className={`bi bi-eye${showPassword ? "-slash" : ""}-fill password-toggle`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>

                    {/* Password strength indicator */}
                    {formData.password && (
                      <>
                        <div
                          className="password-strength-bar"
                          style={{
                            width: "100%",
                            background:
                              passwordStrength === 1
                                ? "#f56565"
                                : passwordStrength === 2
                                  ? "#ed8936"
                                  : passwordStrength === 3
                                    ? "#ecc94b"
                                    : passwordStrength === 4
                                      ? "#48bb78"
                                      : "#e0e0e0",
                          }}
                        ></div>
                        <Form.Text
                          style={{ fontSize: "12px", color: "#718096" }}
                        >
                          Password strength:{" "}
                          {passwordStrength === 1
                            ? "Weak"
                            : passwordStrength === 2
                              ? "Fair"
                              : passwordStrength === 3
                                ? "Good"
                                : passwordStrength === 4
                                  ? "Strong"
                                  : ""}
                        </Form.Text>
                      </>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2" style={{ position: "relative" }}>
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#4a5568",
                        fontSize: "13px",
                      }}
                    >
                      <i className="bi bi-shield-check me-2"></i>Confirm
                      Password
                    </Form.Label>
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      style={inputStyle}
                      size="sm"
                    />
                    <i
                      className={`bi bi-eye${showConfirmPassword ? "-slash" : ""}-fill password-toggle`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    ></i>
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Check
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      isInvalid={!!errors.agreeToTerms}
                      label={
                        <span style={{ fontSize: "14px", color: "#4a5568" }}>
                          I agree to the{" "}
                          <a
                            href="#"
                            className="link-hover"
                            style={{
                              color: "#11998e",
                              textDecoration: "none",
                              fontWeight: "500",
                            }}
                          >
                            Terms & Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="link-hover"
                            style={{
                              color: "#11998e",
                              textDecoration: "none",
                              fontWeight: "500",
                            }}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      }
                      feedback={errors.agreeToTerms}
                      feedbackType="invalid"
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      label={
                        <span style={{ fontSize: "14px", color: "#4a5568" }}>
                          Remember password on this device
                        </span>
                      }
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    size="sm"
                    className="w-100 mb-2 btn-signup"
                    style={buttonStyle}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating Your Account...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-rocket-takeoff me-2"></i>
                        Create Account
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="fw-semibold text-decoration-none link-hover"
                        style={{ color: "#11998e" }}
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </Form>

                <div className="position-relative my-4">
                  <hr style={{ backgroundColor: "#e0e0e0" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "rgba(255, 255, 255, 0.95)",
                      padding: "0 15px",
                      color: "#718096",
                      fontSize: "14px",
                    }}
                  >
                    Or sign up with
                  </span>
                </div>

                <div className="d-flex gap-3">
                  <Button
                    className="flex-fill social-btn"
                    style={socialButtonStyle}
                  >
                    <i
                      className="bi bi-google me-2"
                      style={{ color: "#DB4437" }}
                    ></i>
                    <span style={{ color: "#4a5568" }}>Google</span>
                  </Button>
                  <Button
                    className="flex-fill social-btn"
                    style={socialButtonStyle}
                  >
                    <i
                      className="bi bi-facebook me-2"
                      style={{ color: "#4267B2" }}
                    ></i>
                    <span style={{ color: "#4a5568" }}>Facebook</span>
                  </Button>
                </div>
              </Card.Body>
            </Card>

            <div className="text-center mt-4">
              <Link
                to="/"
                className="text-white text-decoration-none d-inline-flex align-items-center link-hover"
                style={{
                  fontWeight: "500",
                  background: "rgba(255, 255, 255, 0.2)",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>Back to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
