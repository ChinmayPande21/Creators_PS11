import React from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

const Stats = () => {
  const achievements = [
    {
      icon: 'bi-trophy-fill',
      title: 'Award Winning Platform',
      description: 'Best Fintech Solution 2023',
      color: '#FFD700'
    },
    {
      icon: 'bi-star-fill',
      title: '4.9/5 Rating',
      description: 'Based on 50,000+ reviews',
      color: '#FFA500'
    },
    {
      icon: 'bi-speedometer2',
      title: '99.99% Uptime',
      description: 'Reliable service 24/7',
      color: '#00b4d8'
    },
    {
      icon: 'bi-lightning-charge-fill',
      title: '<2s Processing',
      description: 'Lightning fast transactions',
      color: '#0066cc'
    }
  ];

  const metrics = [
    {
      label: 'Customer Satisfaction',
      value: 98,
      color: 'success'
    },
    {
      label: 'Transaction Success Rate',
      value: 99.9,
      color: 'primary'
    },
    {
      label: 'Security Score',
      value: 100,
      color: 'info'
    },
    {
      label: 'Platform Performance',
      value: 97,
      color: 'warning'
    }
  ];

  const globalStats = [
    {
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop',
      stat: '$2.5B+',
      label: 'Annual Transaction Volume',
      description: 'Processing billions in secure transactions'
    },
    {
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      stat: '500K+',
      label: 'Active Business Users',
      description: 'Trusted by businesses worldwide'
    },
    {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      stat: '150+',
      label: 'Countries Supported',
      description: 'Global reach, local expertise'
    }
  ];

  return (
    <section className="section-padding gradient-bg text-white">
      <Container>
        {/* Main Stats */}
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Trusted by Thousands Worldwide</h2>
          <p className="lead mb-5">
            Our numbers speak for themselves - join the fastest growing fintech platform
          </p>
        </div>

        {/* Achievement Badges */}
        <Row className="g-4 mb-5">
          {achievements.map((achievement, index) => (
            <Col key={index} sm={6} lg={3}>
              <div className="text-center p-4 bg-white bg-opacity-10 rounded">
                <i 
                  className={`bi ${achievement.icon} fs-1 mb-3`}
                  style={{ color: achievement.color }}
                ></i>
                <h4 className="fw-bold mb-2">{achievement.title}</h4>
                <p className="mb-0 small">{achievement.description}</p>
              </div>
            </Col>
          ))}
        </Row>

        {/* Global Stats with Images */}
        <Row className="g-4 mb-5">
          {globalStats.map((stat, index) => (
            <Col key={index} md={4}>
              <div className="position-relative rounded overflow-hidden" style={{ height: '300px' }}>
                <img 
                  src={stat.image} 
                  alt={stat.label}
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                />
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center p-4"
                  style={{ background: 'rgba(0, 102, 204, 0.85)' }}
                >
                  <h2 className="display-3 fw-bold mb-2">{stat.stat}</h2>
                  <h5 className="fw-bold mb-2">{stat.label}</h5>
                  <p className="mb-0 small">{stat.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Performance Metrics */}
        <div className="bg-white bg-opacity-10 rounded p-5">
          <h3 className="text-center fw-bold mb-4">Platform Performance Metrics</h3>
          <Row className="g-4">
            {metrics.map((metric, index) => (
              <Col key={index} md={6}>
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{metric.label}</span>
                  <span className="fw-bold">{metric.value}%</span>
                </div>
                <ProgressBar 
                  now={metric.value} 
                  variant={metric.color}
                  style={{ height: '10px' }}
                />
              </Col>
            ))}
          </Row>
        </div>

        {/* Real-time Counter Animation */}
        <div className="text-center mt-5 pt-4">
          <p className="mb-3">Transactions processed in real-time</p>
          <Row className="justify-content-center">
            <Col xs={6} md={3} className="mb-3">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <h3 className="fw-bold mb-0">2,847</h3>
                <small>Today</small>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <h3 className="fw-bold mb-0">19,432</h3>
                <small>This Week</small>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <h3 className="fw-bold mb-0">84,291</h3>
                <small>This Month</small>
              </div>
            </Col>
            <Col xs={6} md={3} className="mb-3">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <h3 className="fw-bold mb-0">1.2M+</h3>
                <small>This Year</small>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Stats;
