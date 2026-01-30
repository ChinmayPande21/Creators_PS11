import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication logic
    setTimeout(() => {
      if (formData.email && formData.password) {
        // Simulate successful login
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", formData.email);
        navigate("/");
      } else {
        setError("Please enter valid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    paddingTop: "0px",
    paddingBottom: "80px",
    position: "relative",
    overflow: "hidden",
  };

  const floatingShapeStyle = {
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(233, 19, 19, 0.1)",
    animation: "float 6s ease-in-out infinite",
  };

  const cardStyle = {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    borderRadius: "25px",
    border: "1px solid rgba(102, 126, 234, 0.2)",
    boxShadow:
      "0 20px 60px rgba(102, 126, 234, 0.2), 0 0 40px rgba(118, 75, 162, 0.1)",
    transition: "all 0.4s ease",
  };

  const inputStyle = {
    borderRadius: "14px",
    padding: "14px 18px",
    border: "2px solid rgba(102, 126, 234, 0.2)",
    background: "rgba(248, 250, 252, 0.8)",
    transition: "all 0.4s ease",
    fontSize: "15px",
    fontWeight: "500",
    color: "#2d3748",
  };

  const buttonStyle = {
    borderRadius: "12px",
    padding: "14px",
    fontWeight: "600",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    color: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    letterSpacing: "0.5px",
  };

  const socialButtonStyle = {
    borderRadius: "14px",
    padding: "12px",
    border: "2px solid rgba(102, 126, 234, 0.15)",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
    transition: "all 0.4s ease",
    fontWeight: "600",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  };

  return (
    <div style={pageStyle}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          .login-card:hover {
            transform: translateY(-5px);
          }
          
          .form-control:focus {
            border-color: #667eea !important;
            background: rgba(248, 250, 252, 1) !important;
            box-shadow: 0 0 0 0.3rem rgba(102, 126, 234, 0.15), inset 0 0 0 1px rgba(102, 126, 234, 0.1) !important;
            transform: translateY(-2px);
          }
          
          .form-label {
            font-size: 14px;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            font-weight: 600 !important;
            color: #4a5568 !important;
            margin-bottom: 8px !important;
          }
          
          .form-check-label {
            font-size: 14px !important;
            color: #4a5568 !important;
            font-weight: 500 !important;
          }
          
          .btn-login:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6), 0 0 20px rgba(118, 75, 162, 0.2);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
          
          .btn-login:active {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }
          
          .social-btn:hover {
            border-color: #667eea;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.2), 0 0 15px rgba(102, 126, 234, 0.1);
            background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%);
          }
          
          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #667eea;
          }
          
          .link-hover {
            transition: all 0.3s ease;
          }
          
          .link-hover:hover {
            color: #764ba2 !important;
            transform: translateX(5px);
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
          <Col md={8} lg={5}>
            <Card style={cardStyle} className="login-card">
              <Card.Body className="p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      boxShadow: "0 5px 15px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    <i
                      className="bi bi-lock-fill text-white"
                      style={{ fontSize: "32px" }}
                    ></i>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: "#2d3748" }}>
                    Welcome Back!
                  </h2>
                  <p className="text-muted">Login to continue to FineEdge</p>
                </div>

                {error && (
                  <Alert
                    variant="danger"
                    style={{ borderRadius: "12px", border: "none" }}
                  >
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: "600", color: "#4a5568" }}>
                      <i className="bi bi-envelope me-2"></i>Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" style={{ position: "relative" }}>
                    <Form.Label style={{ fontWeight: "600", color: "#4a5568" }}>
                      <i className="bi bi-shield-lock me-2"></i>Password
                    </Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      size="lg"
                    />
                    <i
                      className={`bi bi-eye${showPassword ? "-slash" : ""}-fill password-toggle`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      name="rememberMe"
                      label="Remember me"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      style={{ color: "#4a5568" }}
                    />
                    <a
                      href="#"
                      className="text-decoration-none link-hover"
                      style={{ color: "#667eea", fontWeight: "500" }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-100 mb-3 btn-login"
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
                        Logging in...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login to Account
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="fw-semibold text-decoration-none link-hover"
                        style={{ color: "#667eea" }}
                      >
                        Create one now
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
                    Or continue with
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

export default Login;
