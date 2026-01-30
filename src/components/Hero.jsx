import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="hero-section gradient-bg text-white"
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0 pe-lg-5">
            <div className="fade-in-up">
              <h1
                className="display-3 fw-bold mb-4"
                style={{ letterSpacing: "-1px", lineHeight: "1.2" }}
              >
                The Future of Financial Technology
              </h1>
              <p
                className="lead mb-5"
                style={{ fontSize: "1.2rem", opacity: 0.95 }}
              >
                Seamless payments, secure banking, and powerful analytics.
                Transform your financial operations with FineEdge's cutting-edge
                solutions.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Button
                  as={Link}
                  to="/signup"
                  variant="light"
                  size="lg"
                  className="px-4 py-3 fw-semibold"
                  style={{ minWidth: "200px" }}
                >
                  Get Started <i className="bi bi-arrow-right ms-2"></i>
                </Button>
                <Button
                  href="#features"
                  variant="outline-light"
                  size="lg"
                  className="px-4 py-3 fw-semibold"
                  style={{ minWidth: "200px", borderWidth: "2px" }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=800&fit=crop"
                alt="Financial Dashboard"
                className="img-fluid rounded shadow-lg"
                loading="lazy"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
