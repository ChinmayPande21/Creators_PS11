import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const UseCases = () => {
  const useCases = [
    {
      title: 'E-Commerce Businesses',
      image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop',
      description: 'Accept payments globally, manage inventory, and track sales in real-time. Perfect for online stores of any size.',
      features: [
        'Multi-currency support',
        'Shopping cart integration',
        'Fraud detection',
        'Instant settlements'
      ],
      icon: 'bi-cart-check'
    },
    {
      title: 'SaaS Companies',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      description: 'Automate recurring billing, manage subscriptions, and handle upgrades/downgrades seamlessly.',
      features: [
        'Subscription management',
        'Automated invoicing',
        'Usage-based billing',
        'Dunning management'
      ],
      icon: 'bi-cloud-check'
    },
    {
      title: 'Freelancers & Agencies',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
      description: 'Send professional invoices, track payments, and manage multiple clients with ease.',
      features: [
        'Invoice generation',
        'Payment tracking',
        'Client management',
        'Expense tracking'
      ],
      icon: 'bi-briefcase'
    },
    {
      title: 'Marketplaces',
      image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop',
      description: 'Facilitate transactions between buyers and sellers with split payments and escrow services.',
      features: [
        'Split payments',
        'Escrow services',
        'Seller payouts',
        'Dispute resolution'
      ],
      icon: 'bi-shop-window'
    },
    {
      title: 'Non-Profit Organizations',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop',
      description: 'Accept donations, manage fundraising campaigns, and provide tax receipts automatically.',
      features: [
        'Donation processing',
        'Recurring donations',
        'Tax receipts',
        'Campaign tracking'
      ],
      icon: 'bi-heart-fill'
    },
    {
      title: 'Enterprise Solutions',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
      description: 'Custom financial solutions for large organizations with complex requirements.',
      features: [
        'Custom workflows',
        'Advanced reporting',
        'Dedicated support',
        'White-label options'
      ],
      icon: 'bi-building'
    }
  ];

  return (
    <section className="section-padding">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Solutions for Every Business</h2>
          <p className="section-subtitle">
            Tailored financial solutions for different industries and use cases
          </p>
        </div>

        <Row className="g-4">
          {useCases.map((useCase, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <Card.Img 
                    variant="top" 
                    src={useCase.image} 
                    alt={useCase.title}
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  <div 
                    className="position-absolute top-0 end-0 m-3 bg-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <i className={`bi ${useCase.icon} fs-4 text-primary`}></i>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="fw-bold mb-3">{useCase.title}</Card.Title>
                  <Card.Text className="text-muted mb-3">
                    {useCase.description}
                  </Card.Text>
                  <ul className="list-unstyled mb-4">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <small>{feature}</small>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline-primary" className="w-100">
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <div className="text-center mt-5 pt-4">
          <div className="bg-light rounded p-5">
            <h3 className="fw-bold mb-3">Don't See Your Use Case?</h3>
            <p className="text-muted mb-4">
              We offer custom solutions tailored to your specific business needs. 
              Contact our team to discuss how we can help.
            </p>
            <Button variant="primary" size="lg">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UseCases;
