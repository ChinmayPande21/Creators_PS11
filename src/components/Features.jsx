import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Features = () => {
  const features = [
    {
      icon: "bi-lightning-charge-fill",
      title: "Instant Payments",
      description:
        "Process transactions in real-time with our lightning-fast payment infrastructure.",
      color: "success",
    },
    {
      icon: "bi-shield-check",
      title: "Bank-Level Security",
      description:
        "Military-grade encryption and multi-factor authentication keep your data safe.",
      color: "danger",
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Advanced Analytics",
      description:
        "Gain insights with powerful analytics and real-time financial reporting.",
      color: "warning",
    },
    {
      icon: "bi-phone",
      title: "Mobile First",
      description:
        "Access your finances anywhere with our responsive mobile-optimized platform.",
      color: "info",
    },
    {
      icon: "bi-globe",
      title: "Global Reach",
      description:
        "Send and receive payments in 150+ countries with multi-currency support.",
      color: "primary",
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      description:
        "Our dedicated support team is available around the clock to assist you.",
      color: "secondary",
    },
  ];

  return (
    <section id="features" className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Powerful Features</h2>
          <p className="section-subtitle">
            Everything you need to manage your finances efficiently
          </p>
        </div>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <Card
                className="h-100 border-0 text-center p-4"
                style={{ borderRadius: "12px" }}
              >
                <Card.Body>
                  <div
                    className="icon-box"
                    style={{
                      background:
                        feature.color === "success"
                          ? "linear-gradient(135deg, #28a745, #20c997)"
                          : feature.color === "danger"
                            ? "linear-gradient(135deg, #dc3545, #e74c3c)"
                            : feature.color === "warning"
                              ? "linear-gradient(135deg, #ffc107, #ff9800)"
                              : feature.color === "info"
                                ? "linear-gradient(135deg, #17a2b8, #00bcd4)"
                                : feature.color === "secondary"
                                  ? "linear-gradient(135deg, #6c757d, #5a6268)"
                                  : "linear-gradient(135deg, #0066cc, #0096c7)",
                    }}
                  >
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <Card.Title className="fw-bold mb-3 fs-5">
                    {feature.title}
                  </Card.Title>
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                  >
                    {feature.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
