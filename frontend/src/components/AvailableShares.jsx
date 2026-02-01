import React, { useState, useContext } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Badge,
  Alert,
  Modal,
} from "react-bootstrap";
import { PortfolioContext } from "../context/PortfolioContext";
import CandlestickChart from "./CandlestickChart";

const AvailableShares = ({ darkMode }) => {
  const { addHolding } = useContext(PortfolioContext);
  const [quantities, setQuantities] = useState({});
  const [prices, setPrices] = useState({});
  const [addedShares, setAddedShares] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);
  const [selectedSharePrice, setSelectedSharePrice] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAddition, setPendingAddition] = useState(null);

  // Sample shares data - replace with real API data
  const availableShares = [
    {
      id: 1,
      symbol: "AAPL",
      name: "Apple Inc.",
      currentPrice: 150.25,
      dayChange: 2.5,
      sector: "Technology",
      description: "Global leader in consumer electronics",
    },
    {
      id: 2,
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      currentPrice: 140.75,
      dayChange: 1.8,
      sector: "Technology",
      description: "Search engine and cloud services",
    },
    {
      id: 3,
      symbol: "MSFT",
      name: "Microsoft Corporation",
      currentPrice: 378.9,
      dayChange: 3.2,
      sector: "Technology",
      description: "Software and cloud computing",
    },
    {
      id: 4,
      symbol: "TSLA",
      name: "Tesla Inc.",
      currentPrice: 242.5,
      dayChange: -1.5,
      sector: "Automotive",
      description: "Electric vehicles and energy",
    },
    {
      id: 5,
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      currentPrice: 195.8,
      dayChange: 2.1,
      sector: "E-commerce",
      description: "Online retail and cloud services",
    },
    {
      id: 6,
      symbol: "META",
      name: "Meta Platforms Inc.",
      currentPrice: 485.22,
      dayChange: 4.3,
      sector: "Technology",
      description: "Social media and metaverse",
    },
    {
      id: 7,
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      currentPrice: 875.3,
      dayChange: 5.1,
      sector: "Semiconductors",
      description: "AI chips and GPU technology",
    },
    {
      id: 8,
      symbol: "JPM",
      name: "JPMorgan Chase",
      currentPrice: 198.45,
      dayChange: 1.2,
      sector: "Finance",
      description: "Global banking services",
    },
    {
      id: 9,
      symbol: "V",
      name: "Visa Inc.",
      currentPrice: 265.75,
      dayChange: 0.8,
      sector: "Finance",
      description: "Payment processing",
    },
    {
      id: 10,
      symbol: "WMT",
      name: "Walmart Inc.",
      currentPrice: 89.5,
      dayChange: -0.5,
      sector: "Retail",
      description: "Retail and e-commerce",
    },
  ];

  const filteredShares = availableShares.filter(
    (share) =>
      share.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      share.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleQuantityChange = (shareId, value) => {
    setQuantities({
      ...quantities,
      [shareId]: value ? parseInt(value) : 0,
    });
  };

  const handlePriceChange = (shareId, value) => {
    setPrices({
      ...prices,
      [shareId]: value ? parseFloat(value) : 0,
    });
  };

  const handleAddToPortfolio = (share) => {
    const quantity = quantities[share.id] || 1;
    const purchasePrice = prices[share.id] || share.currentPrice;

    if (quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    // Show confirmation modal with investment details
    setPendingAddition({
      share,
      quantity,
      purchasePrice,
      totalInvestment: quantity * purchasePrice,
    });
    setShowConfirmModal(true);
  };

  const handleConfirmAddition = () => {
    if (!pendingAddition) return;

    const { share, quantity, purchasePrice } = pendingAddition;

    const holding = {
      id: `${share.symbol}-${Date.now()}`,
      symbol: share.symbol,
      name: share.name,
      quantity: quantity,
      purchasePrice: purchasePrice,
      currentPrice: share.currentPrice,
      sector: share.sector,
      purchaseDate: new Date().toISOString().split("T")[0],
    };

    addHolding(holding);
    setAddedShares([...addedShares, share.symbol]);
    setQuantities({ ...quantities, [share.id]: 1 });
    setPrices({ ...prices, [share.id]: share.currentPrice });
    setShowConfirmModal(false);
    setPendingAddition(null);

    // Remove notification after 3 seconds
    setTimeout(() => {
      setAddedShares((prev) => prev.filter((s) => s !== share.symbol));
    }, 3000);
  };

  const handleShowChart = (share, price) => {
    setSelectedShare(share);
    setSelectedSharePrice(price);
    setShowChart(true);
  };

  const containerStyle = {
    padding: "2rem 1rem",
    background: darkMode
      ? "linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(31, 41, 55, 0.5) 100%)"
      : "linear-gradient(135deg, rgba(249, 250, 251, 0.5) 0%, rgba(243, 244, 246, 0.5) 100%)",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    border: darkMode
      ? "1px solid rgba(139, 92, 246, 0.2)"
      : "1px solid rgba(139, 92, 246, 0.15)",
  };

  const cardStyle = {
    background: darkMode ? "rgba(31, 41, 55, 0.7)" : "rgba(255, 255, 255, 0.7)",
    border: darkMode
      ? "1px solid rgba(139, 92, 246, 0.2)"
      : "1px solid rgba(139, 92, 246, 0.15)",
    borderRadius: "15px",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  };

  const cardHoverStyle = {
    ...cardStyle,
    border: darkMode
      ? "1px solid rgba(139, 92, 246, 0.4)"
      : "1px solid rgba(139, 92, 246, 0.3)",
    boxShadow: "0 8px 32px rgba(139, 92, 246, 0.15)",
    transform: "translateY(-5px)",
  };

  return (
    <div style={containerStyle}>
      <div className="mb-4">
        <h2
          style={{
            color: darkMode ? "white" : "#1a202c",
            marginBottom: "1.5rem",
          }}
        >
          <i className="bi bi-graph-up me-3"></i>Available Shares to Add
        </h2>

        {/* Search Box */}
        <Form.Control
          type="text"
          placeholder="Search by symbol or company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            background: darkMode
              ? "rgba(17, 24, 39, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            border: darkMode
              ? "1px solid rgba(139, 92, 246, 0.3)"
              : "1px solid rgba(139, 92, 246, 0.2)",
            color: darkMode ? "white" : "#1a202c",
            borderRadius: "12px",
            padding: "0.8rem",
            marginBottom: "1.5rem",
          }}
        />

        {/* Success Notifications */}
        {addedShares.map((symbol) => (
          <Alert
            key={symbol}
            variant="success"
            className="d-flex align-items-center"
            style={{
              background: "rgba(34, 197, 94, 0.2)",
              border: "1px solid rgba(34, 197, 94, 0.5)",
              color: "#22c55e",
              borderRadius: "12px",
              marginBottom: "1rem",
            }}
          >
            <i className="bi bi-check-circle me-2"></i>
            <strong>{symbol}</strong> added to portfolio successfully!
          </Alert>
        ))}

        {/* Shares Grid */}
        <Row className="g-4">
          {filteredShares.length > 0 ? (
            filteredShares.map((share) => (
              <Col lg={6} xxl={4} key={share.id}>
                <Card
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = cardHoverStyle.border;
                    e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                    e.currentTarget.style.transform = cardHoverStyle.transform;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = cardStyle.border;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                  className="h-100"
                >
                  <Card.Body>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5
                          style={{
                            color: darkMode ? "white" : "#1a202c",
                            margin: "0 0 0.5rem 0",
                            fontWeight: "700",
                          }}
                        >
                          {share.symbol}
                        </h5>
                        <p
                          style={{
                            color: darkMode ? "#b0b9c6" : "#6b7280",
                            margin: 0,
                            fontSize: "0.9rem",
                          }}
                        >
                          {share.name}
                        </p>
                      </div>
                      <Badge
                        bg={share.dayChange >= 0 ? "success" : "danger"}
                        style={{
                          padding: "0.4rem 0.8rem",
                          fontSize: "0.8rem",
                        }}
                      >
                        {share.dayChange >= 0 ? "+" : ""}
                        {share.dayChange}%
                      </Badge>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <h3
                        style={{
                          color: "#8b5cf6",
                          margin: "0.5rem 0",
                          fontWeight: "700",
                        }}
                      >
                        ₹{share.currentPrice.toFixed(2)}
                      </h3>
                      <Badge
                        bg="info"
                        style={{
                          background: "rgba(139, 92, 246, 0.2)",
                          color: "#8b5cf6",
                          border: "1px solid rgba(139, 92, 246, 0.5)",
                          padding: "0.4rem 0.8rem",
                          fontSize: "0.8rem",
                        }}
                      >
                        {share.sector}
                      </Badge>
                    </div>

                    <p
                      style={{
                        color: darkMode ? "#b0b9c6" : "#6b7280",
                        fontSize: "0.85rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {share.description}
                    </p>

                    {/* Quantity Input */}
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          color: darkMode ? "#e5e7eb" : "#374151",
                          fontSize: "0.9rem",
                        }}
                      >
                        Quantity
                      </Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quantities[share.id] || 1}
                        onChange={(e) =>
                          handleQuantityChange(share.id, e.target.value)
                        }
                        style={{
                          background: darkMode
                            ? "rgba(17, 24, 39, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                          border: darkMode
                            ? "1px solid rgba(139, 92, 246, 0.2)"
                            : "1px solid rgba(139, 92, 246, 0.15)",
                          color: darkMode ? "white" : "#1a202c",
                          borderRadius: "8px",
                        }}
                      />
                    </Form.Group>

                    {/* Purchase Price Input */}
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          color: darkMode ? "#e5e7eb" : "#374151",
                          fontSize: "0.9rem",
                        }}
                      >
                        Purchase Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        value={prices[share.id] || share.currentPrice}
                        onChange={(e) =>
                          handlePriceChange(share.id, e.target.value)
                        }
                        style={{
                          background: darkMode
                            ? "rgba(17, 24, 39, 0.6)"
                            : "rgba(255, 255, 255, 0.6)",
                          border: darkMode
                            ? "1px solid rgba(139, 92, 246, 0.2)"
                            : "1px solid rgba(139, 92, 246, 0.15)",
                          color: darkMode ? "white" : "#1a202c",
                          borderRadius: "8px",
                        }}
                      />
                    </Form.Group>

                    {/* Total Investment */}
                    <div
                      style={{
                        background: darkMode
                          ? "rgba(139, 92, 246, 0.1)"
                          : "rgba(139, 92, 246, 0.05)",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.2)"
                          : "1px solid rgba(139, 92, 246, 0.15)",
                        padding: "0.8rem",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                      }}
                    >
                      <small
                        style={{ color: darkMode ? "#b0b9c6" : "#6b7280" }}
                      >
                        Total Investment:
                      </small>
                      <div
                        style={{
                          color: "#8b5cf6",
                          fontSize: "1.1rem",
                          fontWeight: "700",
                        }}
                      >
                        ₹
                        {(
                          (quantities[share.id] || 1) *
                          (prices[share.id] || share.currentPrice)
                        ).toFixed(2)}
                      </div>
                    </div>

                    {/* Buttons Container */}
                    <div
                      className="d-flex gap-2"
                      style={{ marginBottom: "1rem" }}
                    >
                      {/* Performance Button */}
                      <Button
                        onClick={() =>
                          handleShowChart(
                            share,
                            prices[share.id] || share.currentPrice,
                          )
                        }
                        style={{
                          flex: 1,
                          background:
                            "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                          border: "none",
                          borderRadius: "8px",
                          padding: "0.8rem",
                          fontWeight: "600",
                          transition: "all 0.3s ease",
                          color: "#1a202c",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 20px rgba(251, 191, 36, 0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <i className="bi bi-candlestick me-2"></i>Performance
                      </Button>
                    </div>

                    {/* Add Button */}
                    <Button
                      onClick={() => handleAddToPortfolio(share)}
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.8rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 20px rgba(139, 92, 246, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className="bi bi-plus-circle me-2"></i>Add to Portfolio
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <Alert
                variant="warning"
                style={{
                  background: "rgba(234, 179, 8, 0.1)",
                  border: "1px solid rgba(234, 179, 8, 0.3)",
                  color: "#eab308",
                  textAlign: "center",
                  borderRadius: "12px",
                }}
              >
                No shares found matching "{searchTerm}"
              </Alert>
            </Col>
          )}
        </Row>
      </div>

      {/* Candlestick Chart Modal */}
      {selectedShare && (
        <CandlestickChart
          show={showChart}
          onHide={() => setShowChart(false)}
          share={selectedShare}
          purchasePrice={selectedSharePrice}
          darkMode={darkMode}
        />
      )}

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
          setPendingAddition(null);
        }}
        centered
        backdrop="static"
      >
        <Modal.Header
          style={{
            background: darkMode
              ? "rgba(31, 41, 55, 0.9)"
              : "rgba(249, 250, 251, 0.9)",
            borderBottom: darkMode
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "1px solid rgba(139, 92, 246, 0.15)",
            color: darkMode ? "white" : "#1a202c",
          }}
          closeButton
        >
          <Modal.Title>
            <i className="bi bi-check-circle me-2"></i>Confirm Investment
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            background: darkMode ? "#1f2937" : "#f9fafb",
            color: darkMode ? "white" : "#1a202c",
          }}
        >
          {pendingAddition && (
            <>
              {/* Company Info */}
              <div
                style={{
                  background: darkMode
                    ? "rgba(139, 92, 246, 0.1)"
                    : "rgba(139, 92, 246, 0.05)",
                  border: darkMode
                    ? "1px solid rgba(139, 92, 246, 0.2)"
                    : "1px solid rgba(139, 92, 246, 0.15)",
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "1.5rem",
                }}
              >
                <h5 style={{ margin: "0 0 0.5rem 0", color: "#8b5cf6" }}>
                  {pendingAddition.share.symbol}
                </h5>
                <p
                  style={{
                    margin: "0",
                    fontSize: "0.9rem",
                    color: darkMode ? "#b0b9c6" : "#6b7280",
                  }}
                >
                  {pendingAddition.share.name}
                </p>
              </div>

              {/* Investment Details */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Quantity */}
                  <div
                    style={{
                      background: darkMode
                        ? "rgba(34, 197, 94, 0.1)"
                        : "rgba(34, 197, 94, 0.05)",
                      border: darkMode
                        ? "1px solid rgba(34, 197, 94, 0.2)"
                        : "1px solid rgba(34, 197, 94, 0.15)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <small style={{ color: darkMode ? "#b0b9c6" : "#6b7280" }}>
                      <i className="bi bi-box me-2"></i>Quantity
                    </small>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        margin: "0.5rem 0 0 0",
                        color: "#22c55e",
                      }}
                    >
                      {pendingAddition.quantity}
                    </p>
                  </div>

                  {/* Price Per Share */}
                  <div
                    style={{
                      background: darkMode
                        ? "rgba(59, 130, 246, 0.1)"
                        : "rgba(59, 130, 246, 0.05)",
                      border: darkMode
                        ? "1px solid rgba(59, 130, 246, 0.2)"
                        : "1px solid rgba(59, 130, 246, 0.15)",
                      padding: "1rem",
                      borderRadius: "8px",
                    }}
                  >
                    <small style={{ color: darkMode ? "#b0b9c6" : "#6b7280" }}>
                      <i className="bi bi-tag me-2"></i>Price Per Share
                    </small>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        margin: "0.5rem 0 0 0",
                        color: "#3b82f6",
                      }}
                    >
                      ₹{pendingAddition.purchasePrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Calculation */}
                <div
                  style={{
                    background: darkMode
                      ? "rgba(17, 24, 39, 0.5)"
                      : "rgba(243, 244, 246, 0.5)",
                    border: darkMode
                      ? "1px solid rgba(139, 92, 246, 0.3)"
                      : "1px solid rgba(139, 92, 246, 0.2)",
                    padding: "1rem",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "0.95rem" }}>
                    {pendingAddition.quantity} shares × ₹
                    {pendingAddition.purchasePrice.toFixed(2)} =
                  </span>
                </div>
              </div>

              {/* Total Investment */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "2px solid #8b5cf6",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <small style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  Total Amount to Invest
                </small>
                <p
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    margin: "0.5rem 0 0 0",
                    color: "white",
                  }}
                >
                  ₹{pendingAddition.totalInvestment.toFixed(2)}
                </p>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer
          style={{
            background: darkMode
              ? "rgba(31, 41, 55, 0.9)"
              : "rgba(249, 250, 251, 0.9)",
            borderTop: darkMode
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "1px solid rgba(139, 92, 246, 0.15)",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
              setPendingAddition(null);
            }}
            style={{
              background: darkMode
                ? "rgba(139, 92, 246, 0.2)"
                : "rgba(139, 92, 246, 0.1)",
              border: "none",
              color: darkMode ? "white" : "#1a202c",
            }}
          >
            <i className="bi bi-x-circle me-2"></i>Cancel
          </Button>
          <Button
            onClick={handleConfirmAddition}
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              border: "none",
            }}
          >
            <i className="bi bi-check-circle me-2"></i>Confirm & Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvailableShares;
