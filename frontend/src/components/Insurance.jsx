import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";

const Insurance = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const insurancePlans = [
    {
      id: 1,
      name: "Health Insurance",
      category: "Health",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      icon: "bi-heart-pulse-fill",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      coverage: "₹500,000",
      description: "Comprehensive health coverage for you and your family",
      features: [
        "Hospital coverage up to ₹500K",
        "Doctor visits included",
        "Prescription drug coverage",
        "Dental and vision add-ons",
        "Mental health support",
        "No waiting period",
        "Worldwide coverage",
        "24/7 telemedicine",
      ],
      popular: true,
    },
    {
      id: 2,
      name: "Life Insurance",
      category: "Life",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
      icon: "bi-shield-fill-check",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      coverage: "₹1,000,000",
      description: "Protect your family's financial future",
      features: [
        "Death benefit up to ₹1M",
        "Terminal illness coverage",
        "Accidental death benefit",
        "Flexible premium payments",
        "Cash value accumulation",
        "Policy loans available",
        "Convertible term options",
        "No medical exam required",
      ],
      popular: false,
    },
    {
      id: 3,
      name: "Auto Insurance",
      category: "Vehicle",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
      icon: "bi-car-front-fill",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      coverage: "₹250,000",
      description: "Complete protection for your vehicle",
      features: [
        "Collision coverage",
        "Comprehensive coverage",
        "Liability protection ₹250K",
        "Roadside assistance 24/7",
        "Rental car reimbursement",
        "Uninsured motorist coverage",
        "Glass repair coverage",
        "Accident forgiveness",
      ],
      popular: false,
    },
  ];

  const addToCart = (plan) => {
    const existingItem = cart.find((item) => item.id === plan.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === plan.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCart([...cart, { ...plan, quantity: 1 }]);
    }
  };

  const removeFromCart = (planId) => {
    setCart(cart.filter((item) => item.id !== planId));
  };

  const updateQuantity = (planId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(planId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === planId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.monthlyPrice * item.quantity,
      0,
    );
  };

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
    setShowDetails(true);
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); }
            50% { box-shadow: 0 4px 25px rgba(102, 126, 234, 0.6); }
          }
          
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          
          .insurance-card {
            border: none;
            border-radius: 20px;
            transition: all 0.4s ease;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            height: 100%;
            animation: fadeInUp 0.6s ease-out;
          }
          
          .insurance-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
            animation: glow 1.5s ease-in-out infinite;
          }
          
          .insurance-image {
            height: 200px;
            object-fit: cover;
            width: 100%;
            transition: transform 0.5s ease;
          }
          
          .insurance-card:hover .insurance-image {
            transform: scale(1.05);
          }
          
          .insurance-icon-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            width: 50px;
            height: 50px;
            border-radius: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            animation: bounce 2s ease-in-out infinite;
          }
          
          .popular-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            box-shadow: 0 3px 10px rgba(245, 87, 108, 0.3);
            animation: pulse 2s ease-in-out infinite;
          }
          
          .price-tag {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1.5rem;
            border-radius: 15px;
            margin: 1rem 0;
            animation: slideInLeft 0.6s ease-out;
          }
          
          .add-to-cart-btn {
            border-radius: 12px;
            padding: 12px;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            transition: all 0.3s ease;
            width: 100%;
            animation: slideInLeft 0.8s ease-out;
          }
          
          .add-to-cart-btn:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          }
          
          .add-to-cart-btn:active {
            animation: bounce 0.4s ease;
          }
          
          .view-details-btn {
            border-radius: 12px;
            padding: 12px;
            font-weight: 600;
            border: none;
            color: white;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s ease;
            width: 100%;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            animation: slideInRight 0.8s ease-out;
          }
          
          .view-details-btn:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
            color: white;
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
          }
          
          .view-details-btn:active {
            animation: bounce 0.4s ease;
          }
          
          .cart-badge {
            position: fixed;
            top: 100px;
            right: 30px;
            z-index: 1000;
            cursor: pointer;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
            transition: all 0.3s ease;
            animation: fadeInUp 0.8s ease-out;
          }
          
          .cart-badge:hover {
            transform: scale(1.15) rotate(5deg);
            box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
          }
          
          .cart-count {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #f5576c;
            color: white;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
          }
          
          .feature-check {
            color: #667eea;
            margin-right: 10px;
          }
          
          .cart-item {
            border-bottom: 1px solid #e0e0e0;
            padding: 1rem 0;
          }
          
          .quantity-controls {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .quantity-btn {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            border: 2px solid #667eea;
            background: white;
            color: #667eea;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .quantity-btn:hover {
            background: #667eea;
            color: white;
          }
        `}
      </style>

      <section
        className="section-padding"
        style={{
          background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <Container>
          {/* Section Header */}
          <Row className="text-center mb-5">
            <Col>
              <h2
                className="display-4 fw-bold mb-3"
                style={{ color: "#2d3748" }}
              >
                Insurance Plans
              </h2>
              <p className="lead text-muted mb-4">
                Comprehensive coverage options tailored to protect what matters
                most
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {[
                  "All",
                  "Health",
                  "Life",
                  "Vehicle",
                  "Property",
                  "Travel",
                  "Business",
                ].map((cat, idx) => (
                  <Badge
                    key={idx}
                    bg={selectedCategory === cat ? "primary" : "light"}
                    text={selectedCategory === cat ? "white" : "dark"}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      border:
                        selectedCategory === cat
                          ? "2px solid #667eea"
                          : "2px solid #e0e0e0",
                      transition: "all 0.3s ease",
                      background:
                        selectedCategory === cat
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "white",
                    }}
                    className="category-badge"
                    onClick={() => setSelectedCategory(cat)}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== cat) {
                        e.currentTarget.style.borderColor = "#667eea";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== cat) {
                        e.currentTarget.style.borderColor = "#e0e0e0";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>

          {/* Insurance Cards Grid */}
          <Row className="g-4 mb-5">
            {insurancePlans
              .filter(
                (plan) =>
                  selectedCategory === "All" ||
                  plan.category === selectedCategory,
              )
              .map((plan) => (
                <Col key={plan.id} lg={4} md={6}>
                  <Card className="insurance-card">
                    <div style={{ position: "relative" }}>
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="insurance-image"
                      />
                      <div className="insurance-icon-badge">
                        <i
                          className={`bi ${plan.icon} text-white`}
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                      {plan.popular && (
                        <div className="popular-badge">
                          <i className="bi bi-star-fill me-1"></i>
                          POPULAR
                        </div>
                      )}
                    </div>

                    <Card.Body className="p-4">
                      <Badge
                        bg="primary"
                        className="mb-3"
                        style={{ borderRadius: "8px", padding: "5px 12px" }}
                      >
                        {plan.category}
                      </Badge>
                      <h4 className="fw-bold mb-2">{plan.name}</h4>
                      <p className="text-muted mb-3">{plan.description}</p>

                      <div className="price-tag">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="h3 fw-bold mb-0">
                              ${plan.monthlyPrice}
                            </div>
                            <small>/month</small>
                          </div>
                          <div className="text-end">
                            <div className="fw-semibold">
                              ${plan.yearlyPrice}/year
                            </div>
                            <small>
                              Save ₹{plan.monthlyPrice * 12 - plan.yearlyPrice}
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Coverage:</strong>
                          <span className="text-primary fw-bold">
                            {plan.coverage}
                          </span>
                        </div>
                      </div>

                      <div className="d-grid gap-2">
                        <Button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(plan)}
                        >
                          <i className="bi bi-cart-plus me-2"></i>
                          Add to Cart
                        </Button>
                        <Button
                          className="view-details-btn"
                          onClick={() => handleViewDetails(plan)}
                        >
                          <i className="bi bi-info-circle me-2"></i>
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </section>

      {/* Floating Cart Badge */}
      {cart.length > 0 && (
        <div className="cart-badge" onClick={() => setShowCart(true)}>
          <i
            className="bi bi-cart3 text-white"
            style={{ fontSize: "1.5rem" }}
          ></i>
          <div className="cart-count">{cart.length}</div>
        </div>
      )}

      {/* Cart Modal */}
      <Modal show={showCart} onHide={() => setShowCart(false)} size="lg">
        <Modal.Header closeButton style={{ borderBottom: "2px solid #667eea" }}>
          <Modal.Title>
            <i className="bi bi-cart3 me-2" style={{ color: "#667eea" }}></i>
            Your Cart ({cart.length} items)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <i
                className="bi bi-cart-x"
                style={{ fontSize: "4rem", color: "#ccc" }}
              ></i>
              <p className="text-muted mt-3">Your cart is empty</p>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", borderRadius: "10px" }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6 className="fw-bold mb-1">{item.name}</h6>
                      <small className="text-muted">{item.category}</small>
                    </Col>
                    <Col md={3}>
                      <div className="quantity-controls">
                        <div
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <i className="bi bi-dash"></i>
                        </div>
                        <span className="fw-bold">{item.quantity}</span>
                        <div
                          className="quantity-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <i className="bi bi-plus"></i>
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="fw-bold text-primary">
                        ₹{item.monthlyPrice * item.quantity}
                      </div>
                      <small className="text-muted">/month</small>
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="link"
                        className="text-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}

              <div
                className="mt-4 p-3"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "15px",
                  color: "white",
                }}
              >
                <Row className="align-items-center">
                  <Col>
                    <h5 className="mb-0">Total Monthly Premium:</h5>
                  </Col>
                  <Col className="text-end">
                    <h3 className="mb-0 fw-bold">₹{getTotalPrice()}</h3>
                    <small>Yearly: ₹{getTotalPrice() * 12}</small>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowCart(false)}
          >
            Continue Shopping
          </Button>
          <Button
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
            disabled={cart.length === 0}
          >
            <i className="bi bi-credit-card me-2"></i>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Plan Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        {selectedPlan && (
          <>
            <Modal.Header
              closeButton
              style={{ borderBottom: "2px solid #667eea" }}
            >
              <Modal.Title>
                <i
                  className={`bi ${selectedPlan.icon} me-2`}
                  style={{ color: "#667eea" }}
                ></i>
                {selectedPlan.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedPlan.image}
                alt={selectedPlan.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  marginBottom: "1.5rem",
                }}
              />

              <Row className="mb-4">
                <Col md={6}>
                  <div
                    className="p-3"
                    style={{ background: "#f8f9fa", borderRadius: "12px" }}
                  >
                    <h5 className="fw-bold mb-2">Monthly Plan</h5>
                    <h2 className="text-primary mb-0">
                      ${selectedPlan.monthlyPrice}/mo
                    </h2>
                  </div>
                </Col>
                <Col md={6}>
                  <div
                    className="p-3"
                    style={{ background: "#f8f9fa", borderRadius: "12px" }}
                  >
                    <h5 className="fw-bold mb-2">Yearly Plan</h5>
                    <h2 className="text-primary mb-0">
                      ${selectedPlan.yearlyPrice}/yr
                    </h2>
                    <Badge bg="success">
                      Save $
                      {selectedPlan.monthlyPrice * 12 -
                        selectedPlan.yearlyPrice}
                    </Badge>
                  </div>
                </Col>
              </Row>

              <div className="mb-4">
                <h5 className="fw-bold mb-3">Coverage Details</h5>
                <div
                  className="p-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderRadius: "12px",
                  }}
                >
                  <h3 className="mb-0">
                    Coverage up to {selectedPlan.coverage}
                  </h3>
                  <p className="mb-0 mt-2">{selectedPlan.description}</p>
                </div>
              </div>

              <div>
                <h5 className="fw-bold mb-3">What's Included</h5>
                <Row>
                  {selectedPlan.features.map((feature, idx) => (
                    <Col key={idx} md={6} className="mb-2">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-check-circle-fill feature-check"></i>
                        <span>{feature}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-secondary"
                onClick={() => setShowDetails(false)}
              >
                Close
              </Button>
              <Button
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                }}
                onClick={() => {
                  addToCart(selectedPlan);
                  setShowDetails(false);
                }}
              >
                <i className="bi bi-cart-plus me-2"></i>
                Add to Cart
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default Insurance;
