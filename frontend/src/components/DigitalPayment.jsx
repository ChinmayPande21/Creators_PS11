import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const DigitalPayment = () => {
  const [activeMethod, setActiveMethod] = useState(0);

  const paymentMethods = [
    {
      id: 1,
      name: "Credit/Debit Cards",
      icon: "💳",
      description: "Accept all major credit and debit cards",
      features: [
        "Visa & Mastercard",
        "American Express",
        "Discover",
        "Instant Processing",
      ],
      fee: "2.9% + ₹0.30",
      color: "#667eea",
    },
    {
      id: 2,
      name: "Digital Wallets",
      icon: "📱",
      description: "Seamless mobile and digital wallet payments",
      features: ["Apple Pay", "Google Pay", "Samsung Pay", "PayPal"],
      fee: "2.5% + ₹0.25",
      color: "#764ba2",
    },
    {
      id: 3,
      name: "Bank Transfers",
      icon: "🏦",
      description: "Direct bank account transfers",
      features: ["ACH Transfers", "Wire Transfers", "SEPA", "Low Fees"],
      fee: "0.8% (max ₹5)",
      color: "#8b5cf6",
    },
  ];

  const paymentFeatures = [
    {
      icon: "🔒",
      title: "Secure Transactions",
      description: "End-to-end encryption with PCI DSS compliance",
    },
    {
      icon: "⚡",
      title: "Instant Processing",
      description: "Real-time payment processing and confirmation",
    },
    {
      icon: "🌍",
      title: "Global Coverage",
      description: "Accept payments from 180+ countries",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Detailed insights and transaction reports",
    },
    {
      icon: "🔄",
      title: "Auto Reconciliation",
      description: "Automatic payment matching and settlements",
    },
    {
      icon: "💡",
      title: "Smart Routing",
      description: "Optimize success rates with intelligent routing",
    },
  ];

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Shapes */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite",
        }}
      />

      <Container style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center text-white mb-5">
          <Badge
            bg="light"
            text="primary"
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            💰 Payment Solutions
          </Badge>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              marginBottom: "20px",
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            Accept Payments Everywhere
          </h2>
          <p
            style={{
              fontSize: "20px",
              opacity: 0.9,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Comprehensive digital payment solutions for your business. Accept
            all major payment methods with industry-leading security.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <Row className="g-4 mb-5">
          {paymentMethods.map((method, index) => (
            <Col key={method.id} lg={4} md={6}>
              <Card
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  border:
                    activeMethod === index
                      ? `3px solid ${method.color}`
                      : "3px solid transparent",
                  borderRadius: "20px",
                  padding: "30px",
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform:
                    activeMethod === index
                      ? "translateY(-10px)"
                      : "translateY(0)",
                  boxShadow:
                    activeMethod === index
                      ? "0 20px 40px rgba(0,0,0,0.2)"
                      : "0 10px 30px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={() => setActiveMethod(index)}
                onMouseLeave={() => setActiveMethod(0)}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "60px",
                      marginBottom: "20px",
                      animation:
                        activeMethod === index ? "pulse 1s infinite" : "none",
                    }}
                  >
                    {method.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: method.color,
                      marginBottom: "10px",
                    }}
                  >
                    {method.name}
                  </h4>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "20px",
                      fontSize: "15px",
                    }}
                  >
                    {method.description}
                  </p>

                  {/* Features List */}
                  <div style={{ marginBottom: "20px" }}>
                    {method.features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        bg="light"
                        text="dark"
                        style={{
                          margin: "5px",
                          padding: "8px 15px",
                          fontSize: "12px",
                          borderRadius: "15px",
                        }}
                      >
                        ✓ {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Fee Badge */}
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${method.color} 0%, ${method.color}dd 100%)`,
                      color: "white",
                      padding: "12px 20px",
                      borderRadius: "15px",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    Fee: {method.fee}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Payment Features Section */}
        {/* CTA Section */}
        <div className="text-center mt-5">
          <Button
            style={{
              background: "white",
              color: "#667eea",
              border: "none",
              padding: "18px 50px",
              fontSize: "18px",
              fontWeight: "700",
              borderRadius: "50px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
            }}
          >
            Start Accepting Payments Today →
          </Button>
          <p
            className="text-white mt-3"
            style={{
              fontSize: "14px",
              opacity: 0.8,
            }}
          >
            No setup fees • 24/7 Support • Cancel anytime
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

export default DigitalPayment;
