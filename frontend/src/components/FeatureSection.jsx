import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FeatureSection = ({ darkMode }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      id: 1,
      title: "Smart Portfolio Tracking",
      description:
        "Track investments, profits, losses, and asset allocation in real time. Get comprehensive insights into your portfolio performance with our advanced analytics dashboard.",
      cta: "View Portfolio",
      ctaLink: "/portfolio",
      icon: "📊",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      accentColor: "#8b5cf6",
      bgColor: "rgba(139, 92, 246, 0.08)",
      illustration: (
        <div style={{ position: "relative", height: "300px", width: "100%" }}>
          <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }}>
            {/* Chart bars */}
            <rect
              x="40"
              y="180"
              width="30"
              height="80"
              fill="#667eea"
              opacity="0.8"
              rx="4"
            />
            <rect
              x="90"
              y="140"
              width="30"
              height="120"
              fill="#764ba2"
              opacity="0.8"
              rx="4"
            />
            <rect
              x="140"
              y="100"
              width="30"
              height="160"
              fill="#a78bfa"
              opacity="0.8"
              rx="4"
            />
            <rect
              x="190"
              y="120"
              width="30"
              height="140"
              fill="#c4b5fd"
              opacity="0.8"
              rx="4"
            />
            <rect
              x="240"
              y="160"
              width="30"
              height="100"
              fill="#ddd6fe"
              opacity="0.8"
              rx="4"
            />

            {/* Trend line */}
            <polyline
              points="40,200 90,160 140,120 190,140 240,180"
              fill="none"
              stroke="#667eea"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 2,
      title: "AI-Powered Stock Insights",
      description:
        "Get AI-based predictions, technical indicators, and risk analysis for better decision-making. Our algorithms analyze market trends and provide actionable recommendations.",
      cta: "Explore Insights",
      ctaLink: "/portfolio?tab=recommendations",
      icon: "🤖",
      gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      accentColor: "#22c55e",
      bgColor: "rgba(34, 197, 94, 0.08)",
      illustration: (
        <div style={{ position: "relative", height: "300px", width: "100%" }}>
          <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }}>
            {/* Brain/AI icon */}
            <circle cx="150" cy="100" r="30" fill="#22c55e" opacity="0.2" />
            <circle cx="120" cy="80" r="15" fill="#22c55e" opacity="0.4" />
            <circle cx="180" cy="80" r="15" fill="#22c55e" opacity="0.4" />
            <circle cx="120" cy="120" r="15" fill="#22c55e" opacity="0.4" />
            <circle cx="180" cy="120" r="15" fill="#22c55e" opacity="0.4" />

            {/* Connecting lines */}
            <line
              x1="150"
              y1="100"
              x2="120"
              y2="80"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="100"
              x2="180"
              y2="80"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="100"
              x2="120"
              y2="120"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="100"
              x2="180"
              y2="120"
              stroke="#22c55e"
              strokeWidth="2"
            />

            {/* Data points */}
            <circle cx="80" cy="200" r="5" fill="#22c55e" />
            <circle cx="150" cy="220" r="5" fill="#22c55e" />
            <circle cx="220" cy="210" r="5" fill="#22c55e" />
            <line
              x1="80"
              y1="200"
              x2="150"
              y2="220"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <line
              x1="150"
              y1="220"
              x2="220"
              y2="210"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 3,
      title: "One-Click Trading Experience",
      description:
        "Buy and sell stocks instantly with a fast, secure, and intuitive interface. Experience seamless trading with real-time price updates and instant confirmations.",
      cta: "Start Trading",
      ctaLink: "/portfolio?tab=available",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      accentColor: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.08)",
      illustration: (
        <div style={{ position: "relative", height: "300px", width: "100%" }}>
          <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }}>
            {/* Phone mockup */}
            <rect
              x="100"
              y="40"
              width="100"
              height="200"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              rx="8"
            />

            {/* Screen */}
            <rect
              x="105"
              y="50"
              width="90"
              height="180"
              fill="#f59e0b"
              opacity="0.1"
              rx="4"
            />

            {/* Trading interface elements */}
            <rect
              x="115"
              y="65"
              width="70"
              height="20"
              fill="#f59e0b"
              opacity="0.3"
              rx="3"
            />
            <circle cx="125" cy="100" r="6" fill="#f59e0b" opacity="0.5" />
            <circle cx="175" cy="100" r="6" fill="#f59e0b" opacity="0.5" />
            <line
              x1="125"
              y1="100"
              x2="175"
              y2="100"
              stroke="#f59e0b"
              strokeWidth="2"
              opacity="0.5"
            />

            {/* Buttons */}
            <rect
              x="115"
              y="155"
              width="30"
              height="15"
              fill="#f59e0b"
              opacity="0.4"
              rx="2"
            />
            <rect
              x="155"
              y="155"
              width="30"
              height="15"
              fill="#f59e0b"
              opacity="0.4"
              rx="2"
            />

            {/* Lightning bolt */}
            <polyline
              points="150,30 148,50 158,52 148,65 155,45"
              fill="#f59e0b"
              opacity="0.8"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 4,
      title: "Learn & Grow Academy",
      description:
        "Beginner-friendly lessons, videos, and guides to master investing. From stock basics to advanced strategies, learn at your own pace with our comprehensive educational resources.",
      cta: "Start Learning",
      ctaLink: "/portfolio",
      icon: "📚",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      accentColor: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.08)",
      illustration: (
        <div style={{ position: "relative", height: "300px", width: "100%" }}>
          <svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }}>
            {/* Books */}
            <rect
              x="70"
              y="120"
              width="30"
              height="100"
              fill="#3b82f6"
              opacity="0.3"
              rx="2"
            />
            <rect
              x="75"
              y="115"
              width="30"
              height="100"
              fill="#3b82f6"
              opacity="0.5"
              rx="2"
            />
            <rect
              x="80"
              y="110"
              width="30"
              height="100"
              fill="#3b82f6"
              opacity="0.7"
              rx="2"
            />

            {/* Graduation cap */}
            <polygon
              points="150,80 130,110 170,110"
              fill="#3b82f6"
              opacity="0.6"
            />
            <rect
              x="135"
              y="110"
              width="30"
              height="40"
              fill="#3b82f6"
              opacity="0.6"
              rx="2"
            />

            {/* Chart/growth */}
            <polyline
              points="200,180 220,150 240,170 260,120"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="200" cy="180" r="3" fill="#3b82f6" />
            <circle cx="220" cy="150" r="3" fill="#3b82f6" />
            <circle cx="240" cy="170" r="3" fill="#3b82f6" />
            <circle cx="260" cy="120" r="3" fill="#3b82f6" />
          </svg>
        </div>
      ),
    },
  ];

  const containerStyle = {
    padding: "4rem 2rem",
    background: darkMode
      ? "linear-gradient(135deg, #111827 0%, #1f2937 100%)"
      : "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    minHeight: "auto",
  };

  const featureCardStyle = (feature, isHovered) => ({
    background: darkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)",
    border: darkMode
      ? "1px solid rgba(139, 92, 246, 0.2)"
      : "1px solid rgba(139, 92, 246, 0.15)",
    borderRadius: "16px",
    padding: "2.5rem",
    marginBottom: "2rem",
    backdropFilter: "blur(10px)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
    boxShadow: isHovered
      ? `0 20px 40px ${feature.accentColor}40`
      : darkMode
        ? "0 4px 12px rgba(0, 0, 0, 0.3)"
        : "0 4px 12px rgba(0, 0, 0, 0.08)",
  });

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(102, 126, 234, 0.3), inset 0 0 20px rgba(102, 126, 234, 0.1);
            }
            50% {
              box-shadow: 0 0 40px rgba(102, 126, 234, 0.6), inset 0 0 30px rgba(102, 126, 234, 0.2);
            }
          }

          @keyframes pulse-border {
            0%, 100% {
              border-color: rgba(102, 126, 234, 0.3);
            }
            50% {
              border-color: rgba(102, 126, 234, 0.8);
            }
          }

          @keyframes rotate-gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .feature-left {
            animation: slideInLeft 0.8s ease-out;
          }
          
          .feature-right {
            animation: slideInRight 0.8s ease-out;
            animation-delay: 0.2s;
            animation-fill-mode: both;
          }
          
          .illustration-hover {
            animation: float 3s ease-in-out infinite;
          }

          .illustration-container {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .illustration-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1;
          }

          .illustration-container::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: conic-gradient(
              from 0deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.1),
              rgba(255, 255, 255, 0)
            );
            animation: rotate 8s linear infinite;
            pointer-events: none;
          }

          @keyframes rotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          @media (max-width: 768px) {
            .feature-right {
              animation-delay: 0s;
            }
          }
        `}
      </style>

      <Container style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
            }}
          >
            Powerful Features for Smart Investing
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: darkMode ? "#9ca3af" : "#6b7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Everything you need to invest confidently and grow your wealth
          </p>
        </div>

        {features.map((feature, index) => (
          <div
            key={feature.id}
            style={{
              ...featureCardStyle(feature, hoveredIndex === index),
              margin: "0 auto 2rem",
              maxWidth: "100%",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Row className="align-items-center" style={{ gap: "2rem" }}>
              {/* Left Content */}
              <Col lg={6} className="feature-left">
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.8rem",
                      fontWeight: "700",
                      color: darkMode ? "white" : "#1a202c",
                      marginBottom: "1rem",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: darkMode ? "#d1d5db" : "#4b5563",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* CTA Button */}
                <Link to={feature.ctaLink} style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      background: feature.gradient,
                      border: "none",
                      color: "white",
                      padding: "0.9rem 2rem",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: `0 4px 15px ${feature.accentColor}40`,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = `0 8px 25px ${feature.accentColor}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = `0 4px 15px ${feature.accentColor}40`;
                    }}
                  >
                    <i className="bi bi-arrow-right me-2"></i>
                    {feature.cta}
                  </button>
                </Link>
              </Col>

              {/* Right Illustration */}
              <Col
                lg={6}
                className="feature-right"
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="illustration-container"
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "380px",
                  }}
                >
                  <div
                    className="illustration-hover"
                    style={{
                      background: feature.bgColor,
                      padding: "3rem 2rem",
                      borderRadius: "16px",
                      border: `2px solid ${feature.accentColor}40`,
                      minHeight: "340px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 2,
                      backdropFilter: "blur(5px)",
                      boxShadow: `0 20px 60px ${feature.accentColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 30px 80px ${feature.accentColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
                      e.currentTarget.style.border = `2px solid ${feature.accentColor}80`;
                      e.currentTarget.style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 60px ${feature.accentColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
                      e.currentTarget.style.border = `2px solid ${feature.accentColor}40`;
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {/* Gradient overlay corners */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "16px",
                        background: `linear-gradient(135deg, ${feature.accentColor}10 0%, transparent 50%, ${feature.accentColor}05 100%)`,
                        pointerEvents: "none",
                        zIndex: 0,
                      }}
                    />

                    {/* Content with relative positioning */}
                    <div
                      style={{ position: "relative", zIndex: 1, width: "100%" }}
                    >
                      {feature.illustration}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${feature.accentColor}, ${feature.accentColor}40)`,
                      filter: "blur(20px)",
                      opacity: 0.6,
                      zIndex: 0,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-15px",
                      left: "-15px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${feature.accentColor}40, transparent)`,
                      filter: "blur(25px)",
                      opacity: 0.5,
                      zIndex: 0,
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        ))}

        {/* Features Summary */}
        <Row
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: darkMode
              ? "rgba(139, 92, 246, 0.1)"
              : "rgba(139, 92, 246, 0.08)",
            border: darkMode
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "1px solid rgba(139, 92, 246, 0.15)",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <Col xs={12}>
            <h4
              style={{
                color: darkMode ? "white" : "#1a202c",
                marginBottom: "1rem",
              }}
            >
              ✨ Start Your Investment Journey Today
            </h4>
            <p
              style={{
                color: darkMode ? "#d1d5db" : "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Join thousands of investors using FineEdge to build and manage
              their portfolios
            </p>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  color: "white",
                  padding: "0.9rem 2.5rem",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(102, 126, 234, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(102, 126, 234, 0.4)";
                }}
              >
                Get Started Now
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeatureSection;
