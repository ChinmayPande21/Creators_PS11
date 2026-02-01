import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      {/* Footer Section */}
      <footer
        id="contact"
        className="text-white pt-5 pb-4"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <Container>
          <Row className="g-4 mb-4">
            {/* Brand and description */}
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(102, 126, 234, 0.1)",
                  borderRadius: "12px",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="bi bi-bank2 text-white"
                    style={{ fontSize: "1.2rem" }}
                  ></i>
                </div>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "800",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  FineEdge
                </span>
              </div>
              <p
                className="text-white-50 mb-4"
                style={{ fontSize: "0.95rem", lineHeight: "1.7" }}
              >
                Modern financial technology solutions for seamless payments,
                banking, and financial management. Trusted by businesses
                worldwide.
              </p>
              <div className="d-flex gap-3">
                {[
                  { icon: "facebook", link: "https://facebook.com" },
                  { icon: "twitter", link: "https://twitter.com" },
                  { icon: "linkedin", link: "https://linkedin.com" },
                  { icon: "instagram", link: "https://instagram.com" },
                ].map((social) => (
                  <a
                    key={social.icon}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(102, 126, 234, 0.1)",
                      color: "#667eea",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                      e.currentTarget.style.color = "white";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.1)";
                      e.currentTarget.style.color = "#667eea";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <i className={`bi bi-${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3 fs-6" style={{ color: "#667eea" }}>
                Company
              </h5>
              <ul className="list-unstyled">
                {["About Us", "Features", "Pricing", "Contact"].map(
                  (item, index) => (
                    <li key={index} className="mb-2">
                      <a
                        href={`#${item.toLowerCase().replace(" ", "")}`}
                        className="text-white-50 text-decoration-none"
                        style={{
                          transition: "all 0.3s ease",
                          fontSize: "0.95rem",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#fff";
                          e.target.style.paddingLeft = "5px";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "rgba(255,255,255,0.5)";
                          e.target.style.paddingLeft = "0";
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </Col>

            {/* Resources */}
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3 fs-6" style={{ color: "#667eea" }}>
                Resources
              </h5>
              <ul className="list-unstyled">
                {["Documentation", "API Reference", "Blog", "Support"].map(
                  (item, index) => (
                    <li key={index} className="mb-2">
                      <a
                        href="#"
                        className="text-white-50 text-decoration-none"
                        style={{
                          transition: "all 0.3s ease",
                          fontSize: "0.95rem",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#fff";
                          e.target.style.paddingLeft = "5px";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "rgba(255,255,255,0.5)";
                          e.target.style.paddingLeft = "0";
                        }}
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </Col>

            {/* Legal */}
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3 fs-6" style={{ color: "#667eea" }}>
                Legal
              </h5>
              <ul className="list-unstyled">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Compliance",
                ].map((item, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href="#"
                      className="text-white-50 text-decoration-none"
                      style={{
                        transition: "all 0.3s ease",
                        fontSize: "0.95rem",
                        display: "inline-block",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#fff";
                        e.target.style.paddingLeft = "5px";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "rgba(255,255,255,0.5)";
                        e.target.style.paddingLeft = "0";
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Contact Info */}
            <Col lg={2} md={6}>
              <h5 className="fw-bold mb-3 fs-6" style={{ color: "#667eea" }}>
                Contact
              </h5>
              <ul
                className="list-unstyled text-white-50"
                style={{ fontSize: "0.9rem" }}
              >
                <li className="mb-3">
                  <i
                    className="bi bi-envelope me-2"
                    style={{ color: "#667eea" }}
                  ></i>
                  <a
                    href="mailto:support@fentech.com"
                    className="text-white-50 text-decoration-none"
                  >
                    support@fentech.com
                  </a>
                </li>
                <li className="mb-3">
                  <i
                    className="bi bi-telephone me-2"
                    style={{ color: "#667eea" }}
                  ></i>
                  <a
                    href="tel:+15551234567"
                    className="text-white-50 text-decoration-none"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="mb-3">
                  <i
                    className="bi bi-geo-alt me-2"
                    style={{ color: "#667eea" }}
                  ></i>
                  San Francisco, CA
                </li>
              </ul>
            </Col>
          </Row>

          <hr
            style={{
              margin: "2rem 0",
              opacity: "0.1",
              background:
                "linear-gradient(90deg, transparent, #667eea, transparent)",
              height: "2px",
              border: "none",
            }}
          />

          {/* Copyright */}
          <Row>
            <Col
              className="text-center text-white-50"
              style={{ fontSize: "0.9rem" }}
            >
              <p className="mb-0">
                &copy; {currentYear} FineEdge. All rights reserved. Built with{" "}
                <i
                  className="bi bi-heart-fill"
                  style={{ color: "#667eea" }}
                ></i>{" "}
                using React & Bootstrap
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
