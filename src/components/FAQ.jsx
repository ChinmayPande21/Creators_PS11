import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const FAQ = () => {
  const faqs = [
    {
      question: 'How secure is FenTech?',
      answer: 'FenTech uses bank-level security with 256-bit encryption, two-factor authentication, and is PCI DSS Level 1 certified. Your data is protected with the same security standards used by major financial institutions.'
    },
    {
      question: 'What payment methods do you support?',
      answer: 'We support all major credit and debit cards, bank transfers, digital wallets, and cryptocurrency payments. Our platform integrates with over 100 payment providers worldwide.'
    },
    {
      question: 'How long does it take to set up an account?',
      answer: 'You can create an account in just a few minutes. After signing up, complete our quick verification process, and you\'ll be ready to start transacting within 24 hours.'
    },
    {
      question: 'What are your transaction fees?',
      answer: 'Our fees vary by plan and transaction volume. The Starter plan includes 100 free transactions per month. Professional and Enterprise plans offer competitive rates with volume discounts. Contact us for custom pricing.'
    },
    {
      question: 'Can I integrate FenTech with my existing systems?',
      answer: 'Yes! We offer comprehensive APIs and pre-built integrations with popular platforms like Shopify, WooCommerce, Salesforce, and more. Our developer documentation makes integration straightforward.'
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Absolutely! We provide email support for all users, with priority 24/7 support for Professional and Enterprise customers. Enterprise clients also get a dedicated account manager.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will apply at the start of your next billing cycle. No penalties for changing plans.'
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'Yes, we offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us within 14 days for a full refund, no questions asked.'
    }
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about FenTech
          </p>
        </div>
        
        <Row className="justify-content-center">
          <Col lg={8}>
            <Accordion defaultActiveKey="0">
              {faqs.map((faq, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                  <Accordion.Header>
                    <strong>{faq.question}</strong>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
            
            <div className="text-center mt-5 p-4 bg-white rounded shadow-sm">
              <h5 className="fw-bold mb-3">Still have questions?</h5>
              <p className="text-muted mb-3">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a href="#contact" className="btn btn-primary">
                Contact Support
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FAQ;
