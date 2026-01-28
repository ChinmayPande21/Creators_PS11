import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ darkMode, toggleDarkMode }) => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      bg={darkMode ? "dark" : "white"}
      expand="lg"
      fixed="top"
      className={`${scrolled ? "shadow" : "shadow-sm"} py-3 transition navbar-${darkMode ? "dark" : "light"}`}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4 fs-md-3 gradient-text"
          onClick={() => setExpanded(false)}
        >
          <i className="bi bi-bank2 me-2"></i>
          FenTech
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-1">
            <Nav.Link
              as={Link}
              to="/"
              className="fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#features"
              className="fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Features
            </Nav.Link>
            <Nav.Link
              href="#pricing"
              className="fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Pricing
            </Nav.Link>
            <Nav.Link
              href="#contact"
              className="fw-semibold"
              onClick={() => setExpanded(false)}
            >
              Contact
            </Nav.Link>
            <div className="d-flex gap-2 mt-3 mt-lg-0 align-items-center">
              <Button
                variant="link"
                className={`p-2 ${darkMode ? "text-warning" : "text-dark"}`}
                onClick={toggleDarkMode}
                title={darkMode ? "Light mode" : "Dark mode"}
                style={{
                  textDecoration: "none",
                  fontSize: "1.3rem",
                  border: "none",
                }}
              >
                <i
                  className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}
                ></i>
              </Button>
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                size="sm"
                onClick={() => setExpanded(false)}
                className="px-3"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/signup"
                variant="primary"
                size="sm"
                onClick={() => setExpanded(false)}
                className="px-3"
              >
                Sign Up
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
