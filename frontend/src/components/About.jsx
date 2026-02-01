import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  const stats = [
    { number: "10+", label: "Years Experience", icon: "bi-calendar-check" },
    { number: "500K+", label: "Active Users", icon: "bi-people" },
    { number: "150+", label: "Countries", icon: "bi-globe" },
    { number: "₹15B+", label: "Transactions", icon: "bi-currency-dollar" },
  ];

  const values = [
    {
      icon: "bi-bullseye",
      title: "Our Mission",
      description:
        "To democratize financial services and make them accessible to everyone, everywhere. We believe in creating innovative solutions that empower businesses and individuals to achieve their financial goals.",
    },
    {
      icon: "bi-eye",
      title: "Our Vision",
      description:
        "To become the world's most trusted fintech platform, setting new standards for security, innovation, and customer experience in the financial technology industry.",
    },
    {
      icon: "bi-heart",
      title: "Our Values",
      description:
        "Integrity, innovation, and customer-centricity drive everything we do. We are committed to transparency, security, and delivering exceptional value to our users.",
    },
  ];

  return (
    <section id="about" className="section-padding">
      <Container>
        {/* About Header */}
        <div className="text-center mb-5">
          <h2 className="section-title">About FineEdge</h2>
          <p className="section-subtitle">
            Leading the future of financial technology
          </p>
        </div>

        {/* Company Story */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=500&fit=crop"
              alt="Team collaboration"
              className="img-fluid rounded shadow-lg"
            />
          </Col>
          <Col lg={6}>
            <h3 className="fw-bold mb-4">
              Transforming Financial Services Since 2014
            </h3>
            <p className="text-muted mb-3">
              FineEdge was founded with a simple yet powerful vision: to make
              financial services accessible, secure, and efficient for everyone.
              What started as a small team of passionate developers has grown
              into a global fintech leader serving over 500,000 users across 150
              countries.
            </p>
            <p className="text-muted mb-3">
              Our platform processes trillions of rupees in transactions
              annually, helping businesses of all sizes streamline their
              financial operations. From startups to enterprises, we provide the
              tools and infrastructure needed to succeed in today's digital
              economy.
            </p>
            <p className="text-muted">
              With cutting-edge technology, bank-level security, and 24/7
              support, we're committed to being your trusted partner in
              financial growth and innovation.
            </p>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="g-4 mb-5">
          {stats.map((stat, index) => (
            <Col key={index} sm={6} lg={3}>
              <Card className="text-center border-0 bg-light h-100 p-4">
                <Card.Body>
                  <i className={`bi ${stat.icon} fs-1 text-primary mb-3`}></i>
                  <h2 className="fw-bold mb-2">{stat.number}</h2>
                  <p className="text-muted mb-0">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Mission, Vision, Values */}
        <Row className="g-4 mb-5">
          {values.map((value, index) => (
            <Col key={index} md={4}>
              <Card className="h-100 border-0 shadow-sm p-4">
                <Card.Body className="text-center">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, #0066cc, #00b4d8)",
                    }}
                  >
                    <i className={`bi ${value.icon} fs-2 text-white`}></i>
                  </div>
                  <h4 className="fw-bold mb-3">{value.title}</h4>
                  <p className="text-muted">{value.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default About;
