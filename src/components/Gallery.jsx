import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";

const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const screenshots = [
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      title: "Analytics Dashboard",
      description: "Real-time insights and comprehensive reporting",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      title: "Transaction Management",
      description: "Track and manage all your transactions",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
      title: "Payment Processing",
      description: "Secure and fast payment gateway",
    },
    {
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
      title: "Mobile Banking",
      description: "Full-featured mobile application",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop",
      title: "Customer Portal",
      description: "User-friendly customer interface",
    },
    {
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      title: "Admin Console",
      description: "Powerful admin management tools",
    },
  ];

  const handleImageClick = (screenshot) => {
    setSelectedImage(screenshot);
    setShowModal(true);
  };

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Platform Screenshots</h2>
          <p className="section-subtitle">
            Explore our intuitive interface and powerful features
          </p>
        </div>

        <Row className="g-4">
          {screenshots.map((screenshot, index) => (
            <Col key={index} md={6} lg={4}>
              <div
                className="position-relative overflow-hidden rounded shadow-sm"
                style={{
                  cursor: "pointer",
                  height: "300px",
                }}
                onClick={() => handleImageClick(screenshot)}
              >
                <img
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-4 text-white"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  }}
                >
                  <h5 className="fw-bold mb-1">{screenshot.title}</h5>
                  <p className="mb-0 small">{screenshot.description}</p>
                </div>
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                >
                  <i className="bi bi-zoom-in fs-1 text-white"></i>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Video Demo Section */}
        <div className="mt-5 pt-4">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="position-relative rounded overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&h=500&fit=crop"
                  alt="Video Demo"
                  className="w-100"
                />
                <div
                  className="position-absolute top-50 start-50 translate-middle"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center shadow-lg"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i className="bi bi-play-fill fs-1 text-primary"></i>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <h3 className="fw-bold mb-4">See FineEdge in Action</h3>
              <p className="text-muted mb-3">
                Watch our 3-minute demo video to see how easy it is to get
                started with FineEdge and transform your financial operations.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Quick setup and onboarding
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Intuitive dashboard walkthrough
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Key features demonstration
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Real-world use cases
                </li>
              </ul>
            </Col>
          </Row>
        </div>

        {/* Feature Highlights */}
        <div className="mt-5 pt-4 bg-light rounded p-5">
          <h3 className="text-center fw-bold mb-4">Platform Highlights</h3>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <i className="bi bi-palette fs-1 text-primary mb-3"></i>
              <h5 className="fw-bold">Modern Design</h5>
              <p className="text-muted small">Clean and intuitive interface</p>
            </Col>
            <Col md={3} className="text-center">
              <i className="bi bi-phone fs-1 text-primary mb-3"></i>
              <h5 className="fw-bold">Mobile Ready</h5>
              <p className="text-muted small">Works on all devices</p>
            </Col>
            <Col md={3} className="text-center">
              <i className="bi bi-lightning-charge fs-1 text-primary mb-3"></i>
              <h5 className="fw-bold">Fast Performance</h5>
              <p className="text-muted small">Lightning quick response</p>
            </Col>
            <Col md={3} className="text-center">
              <i className="bi bi-gear fs-1 text-primary mb-3"></i>
              <h5 className="fw-bold">Customizable</h5>
              <p className="text-muted small">Tailor to your needs</p>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Image Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage?.image}
            alt={selectedImage?.title}
            className="w-100"
          />
          <p className="text-muted mt-3">{selectedImage?.description}</p>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Gallery;
