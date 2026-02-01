import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 10,
        y: (e.clientY / window.innerHeight) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className="hero-section text-white position-relative overflow-hidden"
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .hero-blob-1 {
          animation: float 8s ease-in-out infinite;
        }
        
        .hero-blob-2 {
          animation: float 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .hero-blob-3 {
          animation: float 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .glow-text {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .hero-illustration { transform: scale(0.8) !important; }
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div
        className="hero-blob-1 position-absolute"
        style={{
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          top: "-200px",
          left: "-100px",
        }}
      />
      <div
        className="hero-blob-2 position-absolute"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(240, 147, 251, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          bottom: "-300px",
          right: "-200px",
        }}
      />
      <div
        className="hero-blob-3 position-absolute"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          top: "50%",
          right: "10%",
        }}
      />

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} className="mb-4 mb-lg-0 pe-lg-5">
            <div style={{ animation: "slideInLeft 0.8s ease-out" }}>
              {/* Badge */}
              <div
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "50px",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                }}
              >
                <i className="bi bi-lightning-charge me-2"></i>
                Next-Gen Financial Platform
              </div>

              {/* Main Heading */}
              <h1
                className="display-3 fw-bold mb-4"
                style={{
                  letterSpacing: "-1px",
                  lineHeight: "1.2",
                  fontSize: "3.5rem",
                  background: "linear-gradient(135deg, #fff 0%, #f0f9ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Invest Smart, Grow Faster
              </h1>

              {/* Subtitle */}
              <p
                className="lead mb-5 glow-text"
                style={{
                  fontSize: "1.25rem",
                  opacity: 0.9,
                  lineHeight: "1.8",
                  color: "#e5e7eb",
                }}
              >
                Master the market with AI-powered insights, real-time analytics,
                and intelligent portfolio management. Trade with confidence,
                grow with purpose.
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-4 mb-5">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button
                    size="lg"
                    className="px-5 py-3 fw-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "1.05rem",
                      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                      transition: "all 0.3s ease",
                      minWidth: "200px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow =
                        "0 15px 40px rgba(102, 126, 234, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 8px 25px rgba(102, 126, 234, 0.4)";
                    }}
                  >
                    Start Trading Today{" "}
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Button>
                </Link>

                <Link to="/portfolio" style={{ textDecoration: "none" }}>
                  <Button
                    size="lg"
                    className="px-5 py-3 fw-bold"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "2px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "12px",
                      color: "white",
                      fontSize: "1.05rem",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      minWidth: "200px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.15)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                      e.target.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.1)";
                      e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    View Portfolio <i className="bi bi-graph-up ms-2"></i>
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                  fontSize: "0.95rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-shield-check text-white"></i>
                  </div>
                  <span>Bank-Level Security</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="bi bi-lightning text-white"></i>
                  </div>
                  <span>Real-Time Updates</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Right Illustration */}
          <Col lg={6}>
            <div
              className="hero-illustration"
              style={{
                animation: "slideInRight 0.8s ease-out",
                transform: `translateX(${mousePos.x * 0.5}px) translateY(${mousePos.y * 0.5}px)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <svg
                viewBox="0 0 500 500"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                {/* Chart Background */}
                <rect
                  x="50"
                  y="50"
                  width="400"
                  height="350"
                  fill="rgba(102, 126, 234, 0.1)"
                  rx="20"
                  stroke="rgba(102, 126, 234, 0.3)"
                  strokeWidth="2"
                />

                {/* Upward Trend Line */}
                <polyline
                  points="80,350 150,250 220,280 290,150 360,200 430,80"
                  fill="none"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data Points */}
                <circle cx="80" cy="350" r="6" fill="#667eea" opacity="0.8" />
                <circle cx="150" cy="250" r="6" fill="#667eea" opacity="0.8" />
                <circle cx="220" cy="280" r="6" fill="#667eea" opacity="0.8" />
                <circle cx="290" cy="150" r="6" fill="#667eea" opacity="0.8" />
                <circle cx="360" cy="200" r="6" fill="#667eea" opacity="0.8" />
                <circle cx="430" cy="80" r="6" fill="#667eea" opacity="0.9" />

                {/* Grid Lines */}
                <line
                  x1="70"
                  y1="150"
                  x2="430"
                  y2="150"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1="70"
                  y1="250"
                  x2="430"
                  y2="250"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />

                {/* Y-Axis Labels */}
                <text x="40" y="160" fontSize="12" fill="rgba(255,255,255,0.6)">
                  ₹80K
                </text>
                <text x="40" y="260" fontSize="12" fill="rgba(255,255,255,0.6)">
                  ₹40K
                </text>
                <text x="40" y="360" fontSize="12" fill="rgba(255,255,255,0.6)">
                  ₹0
                </text>

                {/* Gradient Definition */}
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="50%" stopColor="#764ba2" />
                    <stop offset="100%" stopColor="#f093fb" />
                  </linearGradient>
                </defs>

                {/* Glow Effect */}
                <circle
                  cx="430"
                  cy="80"
                  r="15"
                  fill="none"
                  stroke="#f093fb"
                  strokeWidth="2"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    values="15;25"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
