import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pricing = () => {
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
      buttonVariant: "outline-primary",
    },
    {
      name: "Professional",
      price: "49",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited transactions",
        "Advanced analytics",
        "Priority support 24/7",
        "Enhanced security",
        "API access",
        "Multi-user accounts",
        "Custom integrations",
      ],
      popular: true,
      buttonVariant: "primary",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom solutions",
        "SLA guarantee",
        "Advanced compliance",
        "White-label options",
        "On-premise deployment",
      ],
      popular: false,
      buttonVariant: "outline-primary",
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the plan that fits your needs. No hidden fees.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {plans.map((plan, index) => (
            <Col key={index} md={6} lg={4}>
              <Card
                className={`h-100 border-0 position-relative overflow-hidden`}
                style={{
                  borderRadius: "12px",
                  boxShadow: plan.popular
                    ? "0 15px 40px rgba(0, 102, 204, 0.15)"
                    : "0 2px 10px rgba(0, 0, 0, 0.08)",
                  border: plan.popular ? "2px solid #0066cc" : "none",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                {plan.popular && (
                  <Badge
                    bg="primary"
                    className="position-absolute top-0 start-50 translate-middle px-3 py-2"
                    style={{ borderRadius: "20px" }}
                  >
                    Most Popular
                  </Badge>
                )}

                <Card.Body className="p-4 p-md-5 text-center d-flex flex-column">
                  <h3 className="fw-bold mb-2 fs-4">{plan.name}</h3>
                  <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>
                    {plan.description}
                  </p>

                  <div className="mb-5" style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: "bold",
                        color: "#023e8a",
                      }}
                    >
                      {plan.price !== "Custom" && "$"}
                      {plan.price}
                    </div>
                    {plan.price !== "Custom" && (
                      <span className="text-muted">/{plan.period}</span>
                    )}
                    {plan.price === "Custom" && (
                      <div className="text-muted">{plan.period}</div>
                    )}
                  </div>

                  <ul className="list-unstyled mb-5 text-start">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="mb-3"
                        style={{ fontSize: "0.95rem" }}
                      >
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span style={{ color: "#212529" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    as={Link}
                    to="/signup"
                    variant={plan.buttonVariant}
                    size="lg"
                    className="w-100 fw-semibold"
                    style={{ borderRadius: "8px" }}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>
            All plans include 14-day money-back guarantee.
            <a
              href="#contact"
              className="text-primary ms-2 text-decoration-none fw-semibold"
            >
              Contact us
            </a>{" "}
            for custom solutions.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
