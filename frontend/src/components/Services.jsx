import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      title: 'Digital Payments',
      description: 'Accept payments from anywhere in the world with our secure payment gateway. Support for cards, wallets, and bank transfers.',
      features: ['Multiple payment methods', 'Instant settlements', 'Low transaction fees']
    },
    {
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
      title: 'Business Banking',
      description: 'Complete banking solutions tailored for businesses. Manage accounts, transfers, and payroll all in one place.',
      features: ['Multi-currency accounts', 'Bulk payments', 'Virtual cards']
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      title: 'Financial Analytics',
      description: 'Make data-driven decisions with comprehensive financial analytics and customizable reports.',
      features: ['Real-time dashboards', 'Custom reports', 'Predictive insights']
    },
    {
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
      title: 'Security & Compliance',
      description: 'Stay compliant with industry regulations while keeping your data secure with our advanced security features.',
      features: ['PCI DSS certified', 'GDPR compliant', 'Fraud detection']
    }
  ];

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive financial solutions for modern businesses
          </p>
        </div>
        
        <Row className="g-4">
          {services.map((service, index) => (
            <Col key={index} md={6}>
              <Card className="h-100 border-0 overflow-hidden">
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <Card.Img 
                    variant="top" 
                    src={service.image} 
                    alt={service.title}
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3 fs-4">{service.title}</Card.Title>
                  <Card.Text className="text-muted mb-3">
                    {service.description}
                  </Card.Text>
                  <ul className="list-unstyled">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-primary me-2"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;
