import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
} from "react-bootstrap";

const FraudDetection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const fraudStats = [
    {
      value: "99.9%",
      label: "Detection Accuracy",
      icon: "🎯",
      color: "#667eea",
    },
    {
      value: "< 1s",
      label: "Response Time",
      icon: "⚡",
      color: "#764ba2",
    },
    {
      value: "24/7",
      label: "Real-Time Monitoring",
      icon: "👁️",
      color: "#8b5cf6",
    },
    {
      value: "₹400Cr+",
      label: "Fraud Prevented",
      icon: "🛡️",
      color: "#5b21b6",
    },
  ];

  const detectionFeatures = [
    {
      id: 1,
      title: "AI-Powered Detection",
      icon: "🤖",
      description:
        "Advanced machine learning algorithms analyze patterns and detect anomalies in real-time",
      features: [
        "Deep learning models",
        "Pattern recognition",
        "Behavioral analysis",
        "Anomaly detection",
      ],
      accuracy: 99,
      color: "#667eea",
    },
    {
      id: 2,
      title: "Transaction Monitoring",
      icon: "📊",
      description:
        "Continuous monitoring of all transactions to identify suspicious activities instantly",
      features: [
        "Real-time alerts",
        "Velocity checks",
        "Geolocation tracking",
        "Device fingerprinting",
      ],
      accuracy: 98,
      color: "#764ba2",
    },
    {
      id: 3,
      title: "Identity Verification",
      icon: "🔐",
      description:
        "Multi-layer authentication to ensure legitimate users and prevent identity theft",
      features: [
        "Biometric verification",
        "Document validation",
        "KYC compliance",
        "Two-factor authentication",
      ],
      accuracy: 97,
      color: "#8b5cf6",
    },
    {
      id: 4,
      title: "Risk Assessment",
      icon: "⚠️",
      description:
        "Intelligent risk scoring system that evaluates every transaction automatically",
      features: [
        "Risk scoring",
        "Custom rules engine",
        "Historical data analysis",
        "Predictive modeling",
      ],
      accuracy: 96,
      color: "#5b21b6",
    },
  ];

  const threatTypes = [
    {
      icon: "💳",
      title: "Card Fraud",
      description: "Detect stolen or cloned card transactions",
    },
    {
      icon: "🎭",
      title: "Identity Theft",
      description: "Prevent unauthorized account access",
    },
    {
      icon: "📱",
      title: "Account Takeover",
      description: "Block suspicious login attempts",
    },
    {
      icon: "💸",
      title: "Payment Fraud",
      description: "Stop fraudulent payment requests",
    },
    {
      icon: "🌐",
      title: "Phishing Attacks",
      description: "Identify and block phishing attempts",
    },
    {
      icon: "🤝",
      title: "Social Engineering",
      description: "Detect manipulation tactics",
    },
  ];

  return (
    <section
      style={{
        padding: "100px 0",
        background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <Badge
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
            }}
          >
            🛡️ Advanced Security
          </Badge>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
            }}
          >
            AI-Powered Fraud Detection
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Protect your business with advanced fraud detection powered by
            artificial intelligence. Real-time monitoring and instant alerts.
          </p>
        </div>

        {/* Stats Section */}
        <Row className="g-4 mb-5">
          {fraudStats.map((stat, index) => (
            <Col key={index} lg={3} md={6}>
              <Card
                style={{
                  background: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "30px",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(102, 126, 234, 0.2)";
                  e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`;
                  e.currentTarget
                    .querySelectorAll("div, p")
                    .forEach((el) => (el.style.color = "white"));
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.08)";
                  e.currentTarget.style.background = "white";
                  const children = e.currentTarget.querySelectorAll("div, p");
                  children[0].style.color = "#333";
                  children[1].style.color = stat.color;
                  children[2].style.color = "#666";
                }}
              >
                <div style={{ fontSize: "50px", marginBottom: "15px" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: "800",
                    color: stat.color,
                    marginBottom: "10px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {stat.value}
                </div>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#666",
                    marginBottom: 0,
                    fontWeight: "600",
                    transition: "color 0.3s ease",
                  }}
                >
                  {stat.label}
                </p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Detection Features */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "30px",
            padding: "60px 40px",
            marginBottom: "80px",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
          }}
        >
          <h3
            className="text-center text-white mb-5"
            style={{
              fontSize: "36px",
              fontWeight: "700",
            }}
          >
            Comprehensive Fraud Prevention
          </h3>
          <Row className="g-4">
            {detectionFeatures.map((feature, index) => (
              <Col key={feature.id} lg={6}>
                <Card
                  style={{
                    background:
                      activeFeature === index
                        ? "white"
                        : "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border:
                      activeFeature === index
                        ? "3px solid white"
                        : "3px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "20px",
                    padding: "35px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "50px",
                        marginRight: "20px",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color:
                            activeFeature === index ? feature.color : "white",
                          marginBottom: "10px",
                        }}
                      >
                        {feature.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "15px",
                          color:
                            activeFeature === index
                              ? "#666"
                              : "rgba(255, 255, 255, 0.9)",
                          marginBottom: "20px",
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <Row className="g-2 mb-3">
                    {feature.features.map((item, idx) => (
                      <Col key={idx} xs={6}>
                        <div
                          style={{
                            background:
                              activeFeature === index
                                ? `${feature.color}15`
                                : "rgba(255, 255, 255, 0.15)",
                            padding: "10px 15px",
                            borderRadius: "10px",
                            fontSize: "13px",
                            fontWeight: "600",
                            color:
                              activeFeature === index ? feature.color : "white",
                          }}
                        >
                          ✓ {item}
                        </div>
                      </Col>
                    ))}
                  </Row>

                  {/* Accuracy Bar */}
                  <div>
                    <div className="d-flex justify-content-between mb-2">
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: activeFeature === index ? "#333" : "white",
                        }}
                      >
                        Accuracy Rate
                      </span>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color:
                            activeFeature === index ? feature.color : "white",
                        }}
                      >
                        {feature.accuracy}%
                      </span>
                    </div>
                    <ProgressBar
                      now={feature.accuracy}
                      style={{
                        height: "8px",
                        borderRadius: "10px",
                        background:
                          activeFeature === index
                            ? "#e0e0e0"
                            : "rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <div
                        style={{
                          width: `${feature.accuracy}%`,
                          height: "100%",
                          background:
                            activeFeature === index
                              ? `linear-gradient(90deg, ${feature.color} 0%, ${feature.color}dd 100%)`
                              : "white",
                          borderRadius: "10px",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </ProgressBar>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Threat Types */}
        <div className="mb-5">
          <h3
            className="text-center mb-5"
            style={{
              fontSize: "36px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Protection Against All Threats
          </h3>
          <Row className="g-4">
            {threatTypes.map((threat, index) => (
              <Col key={index} lg={4} md={6}>
                <div
                  style={{
                    background: "white",
                    border: "3px solid #e0e0e0",
                    borderRadius: "20px",
                    padding: "30px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#667eea";
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(102, 126, 234, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e0e0e0";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "50px", marginBottom: "20px" }}>
                    {threat.icon}
                  </div>
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#667eea",
                      marginBottom: "10px",
                    }}
                  >
                    {threat.title}
                  </h5>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      marginBottom: 0,
                    }}
                  >
                    {threat.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Section */}
        <div
          style={{
            background: "linear-gradient(to right, #f8f9fa 0%, #e9ecef 100%)",
            borderRadius: "30px",
            padding: "60px 40px",
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 30px",
              fontSize: "40px",
            }}
          >
            🛡️
          </div>
          <h3
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#333",
              marginBottom: "20px",
            }}
          >
            Start Protecting Your Business Today
          </h3>
          <p
            style={{
              fontSize: "18px",
              color: "#666",
              marginBottom: "30px",
              maxWidth: "600px",
              margin: "0 auto 30px",
            }}
          >
            Join thousands of businesses using our AI-powered fraud detection to
            secure their transactions and prevent losses.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                padding: "18px 45px",
                fontSize: "18px",
                fontWeight: "700",
                borderRadius: "50px",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(102, 126, 234, 0.3)";
              }}
            >
              Get Started Free →
            </Button>
            <Button
              style={{
                background: "white",
                color: "#667eea",
                border: "3px solid #667eea",
                padding: "18px 45px",
                fontSize: "18px",
                fontWeight: "700",
                borderRadius: "50px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#667eea";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#667eea";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Schedule Demo
            </Button>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "#999",
              marginTop: "20px",
              marginBottom: 0,
            }}
          >
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FraudDetection;
