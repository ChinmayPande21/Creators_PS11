import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const plans = [
    {
      name: "Starter",
      price: "0",
      period: "Forever Free",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 100 transactions/month",
        "Basic analytics",
        "Email support",
        "Standard security",
        "Mobile app access",
      ],
      popular: false,
      color: "#667eea",
      icon: "🚀",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large organizations",
      features: [
        "Everything in Starter",
        "Dedicated account manager",
        "Custom solutions",
        "SLA guarantee",
        "Advanced compliance",
        "White-label options",
        "On-premise deployment",
      ],
      popular: false,
      color: "#764ba2",
      icon: "👑",
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
      {/* Animated Background Shapes */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "rgba(102, 126, 234, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          left: "-50px",
          width: "300px",
          height: "300px",
          background: "rgba(118, 75, 162, 0.1)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Container style={{ position: "relative", zIndex: 1 }}>
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
            💰 Pricing Plans
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
            Simple, Transparent Pricing
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#666",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <Row className="g-4 justify-content-center">
          {plans.map((plan, index) => (
            <Col key={index} md={6} lg={4}>
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: `3px solid ${hoveredPlan === index ? plan.color : "#e0e0e0"}`,
                  borderRadius: "25px",
                  padding: "40px 30px",
                  height: "100%",
                  cursor: "pointer",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  transform:
                    hoveredPlan === index
                      ? plan.popular
                        ? "translateY(-20px) scale(1.02)"
                        : "translateY(-15px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredPlan === index
                      ? `0 30px 60px ${plan.color}30`
                      : plan.popular
                        ? `0 20px 40px rgba(102, 126, 234, 0.15)`
                        : "0 5px 15px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-15px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                      color: "white",
                      padding: "8px 25px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: `0 10px 25px ${plan.color}40`,
                    }}
                  >
                    ⭐ MOST POPULAR
                  </div>
                )}

                {/* Plan Icon and Name */}
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <div
                    style={{
                      fontSize: "50px",
                      marginBottom: "15px",
                      animation:
                        hoveredPlan === index ? "pulse 1s infinite" : "none",
                    }}
                  >
                    {plan.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: "800",
                      color: plan.color,
                      marginBottom: "10px",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      marginBottom: 0,
                    }}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price Section */}
                <div
                  style={{
                    background: `linear-gradient(135deg, ${plan.color}15 0%, ${plan.color}08 100%)`,
                    borderRadius: "20px",
                    padding: "30px",
                    marginBottom: "30px",
                    textAlign: "center",
                    border: `2px solid ${plan.color}30`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "900",
                      color: plan.color,
                      marginBottom: "5px",
                    }}
                  >
                    {plan.price !== "Custom" && "₹"}
                    {plan.price}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      color: "#666",
                      fontWeight: "600",
                    }}
                  >
                    {plan.price !== "Custom" && `/${plan.period}`}
                    {plan.price === "Custom" && plan.period}
                  </div>
                </div>

                {/* Features List */}
                <div style={{ marginBottom: "30px" }}>
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "15px",
                        fontSize: "15px",
                        color: "#333",
                      }}
                    >
                      <span
                        style={{
                          color: plan.color,
                          fontWeight: "700",
                          marginRight: "12px",
                          fontSize: "18px",
                          lineHeight: "1.2",
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ lineHeight: "1.5" }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  as={Link}
                  to="/signup"
                  style={{
                    width: "100%",
                    background: plan.popular
                      ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`
                      : "white",
                    color: plan.popular ? "white" : plan.color,
                    border: `2px solid ${plan.color}`,
                    padding: "15px",
                    borderRadius: "15px",
                    fontWeight: "700",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    boxShadow: plan.popular
                      ? `0 10px 25px ${plan.color}40`
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 15px 35px ${plan.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = plan.color;
                    }
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = plan.popular
                      ? `0 10px 25px ${plan.color}40`
                      : "none";
                  }}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Footer Info */}
        <div className="text-center mt-5">
          <p
            style={{
              fontSize: "16px",
              color: "#666",
              marginBottom: 0,
            }}
          >
            All plans include <strong>14-day free trial</strong> • No credit
            card required
            <br />
            <span
              style={{
                fontSize: "14px",
                color: "#999",
                marginTop: "10px",
                display: "block",
              }}
            >
              Need a custom plan?{" "}
              <Link
                to="/contact"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontWeight: "700",
                }}
              >
                Contact our sales team →
              </Link>
            </span>
          </p>
        </div>
      </Container>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
};

export default Pricing;
