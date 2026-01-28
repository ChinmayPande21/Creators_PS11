import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: 'bi-person-plus-fill',
      title: 'Create Account',
      description: 'Sign up in minutes with just your email. No lengthy paperwork or waiting periods.'
    },
    {
      number: '02',
      icon: 'bi-shield-check',
      title: 'Verify Identity',
      description: 'Complete our quick and secure verification process to ensure account safety.'
    },
    {
      number: '03',
      icon: 'bi-credit-card-fill',
      title: 'Add Payment Method',
      description: 'Link your bank account or card to start sending and receiving payments.'
    },
    {
      number: '04',
      icon: 'bi-rocket-takeoff-fill',
      title: 'Start Transacting',
      description: 'Begin managing your finances with our powerful suite of financial tools.'
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get started in four simple steps
          </p>
        </div>
        
        <Row className="g-4">
          {steps.map((step, index) => (
            <Col key={index} md={6} lg={3}>
              <div className="text-center position-relative">
                <div className="mb-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white shadow-sm"
                    style={{ width: '100px', height: '100px' }}
                  >
                    <i className={`bi ${step.icon} fs-1 gradient-text`}></i>
                  </div>
                  <div 
                    className="position-absolute top-0 start-50 translate-middle-x fw-bold text-primary"
                    style={{ fontSize: '3rem', opacity: '0.1', zIndex: '-1' }}
                  >
                    {step.number}
                  </div>
                </div>
                <h4 className="fw-bold mb-3">{step.title}</h4>
                <p className="text-muted">{step.description}</p>
                
                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div 
                    className="d-none d-lg-block position-absolute top-50 start-100 translate-middle-y"
                    style={{ 
                      width: '100%', 
                      height: '2px', 
                      background: 'linear-gradient(to right, #0066cc, transparent)',
                      zIndex: '-1'
                    }}
                  ></div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HowItWorks;
