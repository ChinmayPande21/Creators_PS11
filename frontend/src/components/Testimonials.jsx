import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      rating: 5,
      text: 'FenTech has transformed how we handle payments. The platform is intuitive, secure, and has significantly reduced our transaction costs.'
    },
    {
      name: 'Michael Chen',
      role: 'Finance Director, GlobalCorp',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      rating: 5,
      text: 'The analytics dashboard gives us real-time insights into our financial operations. It\'s been a game-changer for our business.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, E-Commerce Plus',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      rating: 5,
      text: 'Outstanding customer support and reliable service. FenTech has helped us scale our payment infrastructure effortlessly.'
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Trusted by thousands of businesses worldwide
          </p>
        </div>
        
        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  {/* Rating stars */}
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                    ))}
                  </div>
                  
                  {/* Testimonial text */}
                  <Card.Text className="text-muted mb-4">
                    "{testimonial.text}"
                  </Card.Text>
                  
                  {/* Author info */}
                  <div className="d-flex align-items-center mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="fw-bold">{testimonial.name}</div>
                      <small className="text-muted">{testimonial.role}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Trust indicators */}
        <div className="text-center mt-5 pt-4">
          <Row className="justify-content-center">
            <Col xs={6} md={3} className="mb-3">
              <h3 className="fw-bold text-primary mb-0">4.9/5</h3>
              <small className="text-muted">Average Rating</small>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <h3 className="fw-bold text-primary mb-0">10K+</h3>
              <small className="text-muted">Happy Customers</small>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <h3 className="fw-bold text-primary mb-0">50K+</h3>
              <small className="text-muted">Reviews</small>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <h3 className="fw-bold text-primary mb-0">150+</h3>
              <small className="text-muted">Countries</small>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
