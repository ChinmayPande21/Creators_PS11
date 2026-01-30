import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Form,
} from "react-bootstrap";

const Lending = () => {
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loanTypes = [
    {
      id: 1,
      name: "Personal Loan",
      icon: "👤",
      interestRate: "7.99%",
      minAmount: "₹1,000",
      maxAmount: "₹50,000",
      term: "12-84 months",
      features: [
        "No collateral required",
        "Quick approval",
        "Flexible repayment",
        "Fixed interest rate",
      ],
      color: "#667eea",
    },
    {
      id: 2,
      name: "Business Loan",
      icon: "💼",
      interestRate: "6.49%",
      minAmount: "₹5,000",
      maxAmount: "₹500,000",
      term: "12-120 months",
      features: [
        "Expand your business",
        "Working capital",
        "Equipment financing",
        "Tax benefits",
      ],
      color: "#764ba2",
    },
    {
      id: 3,
      name: "Home Loan",
      icon: "🏡",
      interestRate: "4.99%",
      minAmount: "₹50,000",
      maxAmount: "₹2,000,000",
      term: "60-360 months",
      features: [
        "Low interest rates",
        "Up to 30 years",
        "Flexible EMI",
        "Home ownership",
      ],
      color: "#8b5cf6",
    },
  ];

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = 7.99 / 100 / 12; // Monthly interest rate
    const time = loanTerm;

    const emi =
      (principal * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    return {
      emi: emi.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  };

  const emiData = calculateEMI();

  const lendingProcess = [
    {
      step: "1",
      title: "Choose Loan Type",
      description: "Select the loan that fits your needs",
      icon: "📋",
    },
    {
      step: "2",
      title: "Fill Application",
      description: "Complete the online form in minutes",
      icon: "✍️",
    },
    {
      step: "3",
      title: "Get Approved",
      description: "Instant decision on your loan",
      icon: "✅",
    },
    {
      step: "4",
      title: "Receive Funds",
      description: "Money in your account within 24 hours",
      icon: "💸",
    },
  ];

  return (
    <section
      style={{
        padding: "100px 0",
        background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
        position: "relative",
      }}
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-5">
          <Badge
            bg="primary"
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              marginBottom: "20px",
              fontSize: "14px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            💳 Lending Solutions
          </Badge>
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "20px",
            }}
          >
            Smart Lending Solutions
          </h2>
          <p
            style={{
              fontSize: "20px",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Get the funds you need with competitive rates and flexible terms.
            Quick approval and instant disbursal.
          </p>
        </div>

        {/* Loan Types Grid */}
        <Row className="g-4 mb-5">
          {loanTypes.map((loan) => (
            <Col key={loan.id} lg={4} md={6}>
              <Card
                style={{
                  border:
                    selectedLoan === loan.id
                      ? `3px solid ${loan.color}`
                      : "3px solid #e0e0e0",
                  borderRadius: "20px",
                  padding: "30px",
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: "white",
                  boxShadow:
                    selectedLoan === loan.id
                      ? "0 20px 40px rgba(102, 126, 234, 0.2)"
                      : "0 5px 15px rgba(0,0,0,0.05)",
                }}
                onClick={() => setSelectedLoan(loan.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(102, 126, 234, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  if (selectedLoan !== loan.id) {
                    e.currentTarget.style.boxShadow =
                      "0 5px 15px rgba(0,0,0,0.05)";
                  }
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "60px",
                      marginBottom: "20px",
                    }}
                  >
                    {loan.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: loan.color,
                      marginBottom: "10px",
                    }}
                  >
                    {loan.name}
                  </h4>

                  <div
                    style={{
                      background: `linear-gradient(135deg, ${loan.color} 0%, ${loan.color}dd 100%)`,
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "15px",
                      fontWeight: "700",
                      fontSize: "20px",
                      marginBottom: "20px",
                      display: "inline-block",
                    }}
                  >
                    {loan.interestRate} APR
                  </div>

                  <div style={{ marginBottom: "20px", textAlign: "left" }}>
                    <p
                      style={{
                        margin: "8px 0",
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                      <strong>Amount:</strong> {loan.minAmount} -{" "}
                      {loan.maxAmount}
                    </p>
                    <p
                      style={{
                        margin: "8px 0",
                        color: "#666",
                        fontSize: "14px",
                      }}
                    >
                      <strong>Term:</strong> {loan.term}
                    </p>
                  </div>

                  {/* Features */}
                  <div style={{ marginBottom: "20px" }}>
                    {loan.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          textAlign: "left",
                          padding: "8px 0",
                          color: "#555",
                          fontSize: "14px",
                        }}
                      >
                        ✓ {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    style={{
                      width: "100%",
                      background:
                        selectedLoan === loan.id
                          ? `linear-gradient(135deg, ${loan.color} 0%, ${loan.color}dd 100%)`
                          : "white",
                      color: selectedLoan === loan.id ? "white" : loan.color,
                      border: `2px solid ${loan.color}`,
                      padding: "12px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${loan.color} 0%, ${loan.color}dd 100%)`;
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedLoan !== loan.id) {
                        e.currentTarget.style.background = "white";
                        e.currentTarget.style.color = loan.color;
                      }
                    }}
                  >
                    Apply Now →
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* EMI Calculator Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "30px",
            padding: "60px 40px",
            marginTop: "80px",
            marginBottom: "80px",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
          }}
        >
          <h3
            className="text-center text-white mb-5"
            style={{
              fontSize: "36px",
              fontWeight: "700",
            }}
          >
            💰 EMI Calculator
          </h3>
          <Row className="align-items-center">
            <Col lg={6}>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  padding: "40px",
                }}
              >
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label
                      className="text-white"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Loan Amount: ₹{loanAmount.toLocaleString()}
                    </Form.Label>
                    <Form.Range
                      min="1000"
                      max="100000"
                      step="1000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      style={{
                        height: "8px",
                      }}
                    />
                    <div
                      className="d-flex justify-content-between text-white mt-2"
                      style={{ fontSize: "14px" }}
                    >
                      <span>₹1,000</span>
                      <span>₹100,000</span>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label
                      className="text-white"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Loan Term: {loanTerm} months
                    </Form.Label>
                    <Form.Range
                      min="6"
                      max="84"
                      step="6"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      style={{
                        height: "8px",
                      }}
                    />
                    <div
                      className="d-flex justify-content-between text-white mt-2"
                      style={{ fontSize: "14px" }}
                    >
                      <span>6 months</span>
                      <span>84 months</span>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </Col>

            <Col lg={6}>
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px",
                }}
              >
                <div className="mb-4">
                  <h4
                    style={{
                      color: "#667eea",
                      fontSize: "18px",
                      marginBottom: "10px",
                    }}
                  >
                    Monthly EMI
                  </h4>
                  <div
                    style={{
                      fontSize: "42px",
                      fontWeight: "800",
                      color: "#667eea",
                    }}
                  >
                    ₹{emiData.emi}
                  </div>
                </div>
                <hr style={{ margin: "30px 0" }} />
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ fontSize: "16px", color: "#666" }}>
                    Principal Amount:
                  </span>
                  <strong style={{ fontSize: "18px", color: "#333" }}>
                    ₹{loanAmount.toLocaleString()}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ fontSize: "16px", color: "#666" }}>
                    Total Interest:
                  </span>
                  <strong style={{ fontSize: "18px", color: "#764ba2" }}>
                    ₹{parseFloat(emiData.totalInterest).toLocaleString()}
                  </strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ fontSize: "16px", color: "#666" }}>
                    Total Amount:
                  </span>
                  <strong style={{ fontSize: "18px", color: "#667eea" }}>
                    ₹{parseFloat(emiData.totalAmount).toLocaleString()}
                  </strong>
                </div>
                <Button
                  style={{
                    width: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    padding: "15px",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "16px",
                    marginTop: "20px",
                  }}
                >
                  Apply for This Loan
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        {/* Lending Process */}
        <div className="mb-5">
          <h3
            className="text-center mb-5"
            style={{
              fontSize: "36px",
              fontWeight: "700",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Simple 4-Step Process
          </h3>
          <Row className="g-4">
            {lendingProcess.map((process, index) => (
              <Col key={index} lg={3} md={6}>
                <div
                  style={{
                    background: "white",
                    border: "3px solid #667eea",
                    borderRadius: "20px",
                    padding: "40px 30px",
                    textAlign: "center",
                    height: "100%",
                    position: "relative",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(102, 126, 234, 0.2)";
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    e.currentTarget
                      .querySelectorAll("h5, p")
                      .forEach((el) => (el.style.color = "white"));
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.background = "white";
                    e.currentTarget
                      .querySelectorAll("h5, p")
                      .forEach((el, idx) => {
                        el.style.color = idx === 0 ? "#667eea" : "#666";
                      });
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "50px",
                      height: "50px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "white",
                      boxShadow: "0 5px 15px rgba(102, 126, 234, 0.3)",
                    }}
                  >
                    {process.step}
                  </div>
                  <div
                    style={{
                      fontSize: "50px",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {process.icon}
                  </div>
                  <h5
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      color: "#667eea",
                      marginBottom: "10px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {process.title}
                  </h5>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "15px",
                      marginBottom: 0,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {process.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default Lending;
