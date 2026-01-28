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
                Transform your financial operations with FenTech's cutting-edge
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

              {/* Trust indicators */}
              <div className="mt-5 pt-4 border-top border-light border-opacity-25">
                <Row className="text-center text-lg-start">
                  <Col xs={6} sm={4} className="mb-3 mb-sm-0">
                    <h3 className="fw-bold mb-0" style={{ fontSize: "1.8rem" }}>
                      500K+
                    </h3>
                    <small
                      className="text-light"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Active Users
                    </small>
                  </Col>
                  <Col xs={6} sm={4} className="mb-3 mb-sm-0">
                    <h3 className="fw-bold mb-0" style={{ fontSize: "1.8rem" }}>
                      $2B+
                    </h3>
                    <small
                      className="text-light"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Processed
                    </small>
                  </Col>
                  <Col xs={6} sm={4} className="mb-3 mb-sm-0">
                    <h3 className="fw-bold mb-0" style={{ fontSize: "1.8rem" }}>
                      99.9%
                    </h3>
                    <small
                      className="text-light"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Uptime
                    </small>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className="hero-image-container">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop"
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
