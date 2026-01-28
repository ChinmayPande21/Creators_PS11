import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-dark text-white pt-5 pb-4"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <Container>
        <Row className="g-4 mb-4">
          {/* Brand and description */}
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <h4 className="fw-bold mb-3 fs-4">
              <i className="bi bi-bank2 me-2 gradient-text"></i>
              <span className="gradient-text">FenTech</span>
            </h4>
            <p
              className="text-white-50 mb-4"
              style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
            >
              Modern financial technology solutions for seamless payments,
              banking, and financial management. Trusted by businesses
              worldwide.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                className="text-white-50 fs-5 transition"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: "all 0.3s ease", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#0066cc")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com"
                className="text-white-50 fs-5 transition"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: "all 0.3s ease", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#0066cc")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="text-white-50 fs-5 transition"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: "all 0.3s ease", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#0066cc")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://instagram.com"
                className="text-white-50 fs-5 transition"
                target="_blank"
                rel="noopener noreferrer"
                style={{ transition: "all 0.3s ease", textDecoration: "none" }}
                onMouseEnter={(e) => (e.target.style.color = "#0066cc")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.5)")
                }
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3 fs-6">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#about"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#features"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#pricing"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Pricing
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#contact"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          {/* Resources */}
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3 fs-6">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Documentation
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  API Reference
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Support
                </a>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h5 className="fw-bold mb-3 fs-6">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Terms of Service
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Cookie Policy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none transition"
                  style={{ transition: "all 0.3s ease", fontSize: "0.95rem" }}
                  onMouseEnter={(e) => (e.target.style.color = "#fff")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  Compliance
                </a>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-3 fs-6">Contact</h5>
            <ul
              className="list-unstyled text-white-50"
              style={{ fontSize: "0.95rem" }}
            >
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                <a
                  href="mailto:support@fentech.com"
                  className="text-white-50 text-decoration-none"
                >
                  support@fentech.com
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                <a
                  href="tel:+15551234567"
                  className="text-white-50 text-decoration-none"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                San Francisco, CA
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4 border-secondary border-opacity-25" />

        {/* Copyright */}
        <Row>
          <Col
            className="text-center text-white-50"
            style={{ fontSize: "0.9rem" }}
          >
            <p className="mb-0">
              &copy; {currentYear} FenTech. All rights reserved. Built with
              React & Bootstrap.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
