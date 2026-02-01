import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Partners = () => {
  const partners = [
    {
      name: 'Visa',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop'
    },
    {
      name: 'Mastercard',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=100&fit=crop'
    },
    {
      name: 'PayPal',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&h=100&fit=crop'
    },
    {
      name: 'Stripe',
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=200&h=100&fit=crop'
    },
    {
      name: 'American Express',
      logo: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=200&h=100&fit=crop'
    },
    {
      name: 'Apple Pay',
      logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=100&fit=crop'
    }
  ];

  const integrations = [
    {
      icon: 'bi-shop',
      name: 'E-commerce',
      description: 'Shopify, WooCommerce, Magento'
    },
    {
      icon: 'bi-code-square',
      name: 'Development',
      description: 'REST API, GraphQL, Webhooks'
    },
    {
      icon: 'bi-diagram-3',
      name: 'CRM',
      description: 'Salesforce, HubSpot, Zoho'
    },
    {
      icon: 'bi-calculator',
      name: 'Accounting',
      description: 'QuickBooks, Xero, FreshBooks'
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        {/* Partners Header */}
        <div className="text-center mb-5">
          <h2 className="section-title">Trusted Partners & Integrations</h2>
          <p className="section-subtitle">
            We work with industry leaders to provide you the best service
          </p>
        </div>

        {/* Partner Logos */}
        <div className="mb-5">
          <Row className="g-4 align-items-center justify-content-center">
            {partners.map((partner, index) => (
              <Col key={index} xs={6} md={4} lg={2}>
                <div 
                  className="bg-white rounded shadow-sm p-3 text-center"
                  style={{ 
                    height: '100px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="img-fluid"
                    style={{ 
                      maxHeight: '60px', 
                      maxWidth: '100%',
                      filter: 'grayscale(100%)',
                      opacity: '0.7'
                    }}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Integration Categories */}
        <div className="mt-5">
          <h3 className="text-center fw-bold mb-4">Seamless Integrations</h3>
          <Row className="g-4">
            {integrations.map((integration, index) => (
              <Col key={index} sm={6} lg={3}>
                <div className="text-center p-4 bg-white rounded shadow-sm h-100">
                  <i className={`bi ${integration.icon} fs-1 text-primary mb-3`}></i>
                  <h5 className="fw-bold mb-2">{integration.name}</h5>
                  <p className="text-muted small mb-0">{integration.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Trust Badges */}
        <div className="text-center mt-5 pt-4">
          <p className="text-muted mb-4">Certified and compliant with global standards</p>
          <Row className="justify-content-center g-3">
            <Col xs={6} sm={4} md={2}>
              <div className="bg-white rounded shadow-sm p-3">
                <i className="bi bi-shield-fill-check text-success fs-1"></i>
                <p className="small fw-bold mb-0 mt-2">PCI DSS</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <div className="bg-white rounded shadow-sm p-3">
                <i className="bi bi-lock-fill text-primary fs-1"></i>
                <p className="small fw-bold mb-0 mt-2">ISO 27001</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <div className="bg-white rounded shadow-sm p-3">
                <i className="bi bi-file-earmark-check text-info fs-1"></i>
                <p className="small fw-bold mb-0 mt-2">GDPR</p>
              </div>
            </Col>
            <Col xs={6} sm={4} md={2}>
              <div className="bg-white rounded shadow-sm p-3">
                <i className="bi bi-award-fill text-warning fs-1"></i>
                <p className="small fw-bold mb-0 mt-2">SOC 2</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
