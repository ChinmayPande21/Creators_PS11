import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const Security = () => {
  const securityFeatures = [
    {
      icon: 'bi-lock-fill',
      title: '256-bit Encryption',
      description: 'Military-grade encryption protects all your data'
    },
    {
      icon: 'bi-shield-fill-check',
      title: 'Two-Factor Auth',
      description: 'Extra layer of security for your account'
    },
    {
      icon: 'bi-eye-slash-fill',
      title: 'Privacy First',
      description: 'Your data is never shared or sold'
    },
    {
      icon: 'bi-fingerprint',
      title: 'Biometric Login',
      description: 'Secure access with fingerprint or face ID'
    }
  ];

  const compliance = [
    'PCI DSS Level 1',
    'GDPR Compliant',
    'ISO 27001',
    'SOC 2 Type II',
    'CCPA Compliant',
    'FINRA Regulated'
  ];

  return (
    <section className="section-padding">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div className="pe-lg-5">
              <h2 className="section-title">Bank-Level Security & Compliance</h2>
              <p className="lead text-muted mb-4">
                Your security is our top priority. We use industry-leading security measures 
                to protect your financial data and ensure compliance with global standards.
              </p>
              
              <Row className="g-4 mb-4">
                {securityFeatures.map((feature, index) => (
                  <Col key={index} sm={6}>
                    <div className="d-flex">
                      <div className="me-3">
                        <div 
                          className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                          style={{ width: '50px', height: '50px', minWidth: '50px' }}
                        >
                          <i className={`bi ${feature.icon} fs-4 text-primary`}></i>
                        </div>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-2">{feature.title}</h5>
                        <p className="text-muted small mb-0">{feature.description}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>

              <div className="mt-4">
                <h5 className="fw-bold mb-3">Compliance & Certifications</h5>
                <div className="d-flex flex-wrap gap-2">
                  {compliance.map((cert, index) => (
                    <Badge 
                      key={index} 
                      bg="primary" 
                      className="px-3 py-2 fw-normal"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <i className="bi bi-patch-check-fill me-2"></i>
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=500&fit=crop" 
                alt="Security" 
                className="img-fluid rounded shadow-lg"
              />
              <div 
                className="position-absolute bottom-0 start-0 m-4 bg-white rounded shadow p-3"
                style={{ maxWidth: '200px' }}
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-shield-fill-check text-success fs-2 me-3"></i>
                  <div>
                    <div className="fw-bold">100% Secure</div>
                    <small className="text-muted">Verified & Protected</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Security;
