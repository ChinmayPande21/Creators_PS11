import React, { useContext, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import { PortfolioContext } from "../context/PortfolioContext";
import CandlestickChart from "./CandlestickChart";

const PortfolioDashboard = ({ darkMode }) => {
  const {
    activePortfolio,
    getPortfolioMetrics,
    addHolding,
    updateRiskProfile,
  } = useContext(PortfolioContext);
  const [showAddHoldingModal, setShowAddHoldingModal] = useState(false);
  const [newHolding, setNewHolding] = useState({
    symbol: "",
    name: "",
    quantity: 0,
    buyPrice: 0,
    currentPrice: 0,
    sector: "Technology",
    assetType: "stock",
  });
  const [showChart, setShowChart] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const metrics = getPortfolioMetrics();

  if (!metrics || !activePortfolio || !metrics.holdings || metrics.holdings.length === 0) {
    return <div>Loading...</div>;
  }

  const handleShowChart = (holding) => {
    setSelectedHolding(holding);
    setShowChart(true);
  };

  // Memoize expensive calculations to prevent recalculation on every render
  const { cagr, irr, totalReturn } = useMemo(() => {
    // CAGR Calculator (Compound Annual Growth Rate)
    const calculateCAGR = () => {
      if (!metrics.holdings || metrics.holdings.length === 0) return 0;

      const totalInvestment = metrics.holdings.reduce(
        (sum, h) => sum + h.quantity * h.buyPrice,
        0,
      );

      if (totalInvestment <= 0) return 0;

      // Calculate years based on actual holding period (using purchase date)
      const earliestDate = new Date(Math.min(...metrics.holdings.map(h => new Date(h.date))));
      const now = new Date();
      const years = (now - earliestDate) / (365.25 * 24 * 60 * 60 * 1000) || 1;
      const endValue = metrics.currentValue || 0;
      const startValue = totalInvestment;

      if (startValue <= 0) return 0;

      const cagr = (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
      return isFinite(cagr) ? cagr : 0;
    };

    // Internal Rate of Return Calculator
    const calculateIRR = () => {
      if (!metrics.holdings || metrics.holdings.length === 0) return 0;

      const totalInvestment = metrics.holdings.reduce(
        (sum, h) => sum + h.quantity * h.buyPrice,
        0,
      );

      const currentValue = metrics.currentValue || 0;
      const gainLoss = currentValue - totalInvestment;

      if (totalInvestment <= 0) return 0;

      // Simplified IRR = (Current Value - Initial Investment) / Initial Investment * 100
      const irr = (gainLoss / totalInvestment) * 100;
      return isFinite(irr) ? irr : 0;
    };

    return {
      cagr: calculateCAGR(),
      irr: calculateIRR(),
      totalReturn: metrics.totalReturn || 0,
    };
  }, [metrics]);

  const dashboardStyle = {
    background: darkMode
      ? "rgba(17, 24, 39, 0.95)"
      : "rgba(255, 255, 255, 0.95)",
    color: darkMode ? "#fff" : "#1a202c",
    backdropFilter: "blur(20px)",
  };

  const cardStyle = {
    background: darkMode ? "rgba(31, 41, 55, 0.8)" : "rgba(249, 250, 251, 0.8)",
    border: darkMode
      ? "1px solid rgba(139, 92, 246, 0.2)"
      : "1px solid rgba(139, 92, 246, 0.15)",
    borderRadius: "16px",
    transition: "all 0.3s ease",
  };

  const metricBoxStyle = {
    ...cardStyle,
    padding: "1.5rem",
    textAlign: "center",
  };

  const getReturnColor = (value) => {
    if (value > 0) return "#10b981"; // Green
    if (value < 0) return "#ef4444"; // Red
    return "#6b7280"; // Gray
  };

  const handleAddHolding = () => {
    const holding = {
      ...newHolding,
      totalCost: newHolding.quantity * newHolding.buyPrice,
      currentValue: newHolding.quantity * newHolding.currentPrice,
      date: new Date().toISOString().split("T")[0],
    };
    addHolding(holding);
    setShowAddHoldingModal(false);
    setNewHolding({
      symbol: "",
      name: "",
      quantity: 0,
      buyPrice: 0,
      currentPrice: 0,
      sector: "Technology",
      assetType: "stock",
    });
  };

  const getMetricLabel = (label) => {
    const labels = {
      totalInvested: "Total Invested",
      currentValue: "Current Value",
      totalReturn: "Total Return",
      gains: "Gains/Loss",
      volatility: "Volatility",
      maxDrawdown: "Max Drawdown",
      diversificationScore: "Diversification",
    };
    return labels[label] || label;
  };

  return (
    <section style={dashboardStyle} className="py-5 min-vh-100">
      <Container>
        {/* Header */}
        <div className="mb-5">
          <h1 className="mb-2 fw-bold">
            <i className="bi bi-graph-up me-3" style={{ color: "#8b5cf6" }}></i>
            Portfolio Management Dashboard
          </h1>
          <p style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
            Intelligent tracking, analysis, and optimization of your equity
            investments
          </p>
        </div>

        {/* Risk Profile Selection */}
        <Row className="mb-4">
          <Col md={6}>
            <Card style={cardStyle} className="p-4">
              <h5 className="mb-3">Your Risk Profile</h5>
              <div className="d-flex gap-2 mb-3">
                {["conservative", "moderate", "aggressive"].map((profile) => (
                  <Button
                    key={profile}
                    size="sm"
                    variant={
                      activePortfolio.riskProfile === profile
                        ? "primary"
                        : "outline-primary"
                    }
                    onClick={() => updateRiskProfile(profile)}
                    style={{
                      background:
                        activePortfolio.riskProfile === profile
                          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          : "transparent",
                      border: "none",
                      borderRadius: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {profile}
                  </Button>
                ))}
              </div>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Your investment strategy aligns with your risk tolerance
              </small>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={cardStyle} className="p-4">
              <h5 className="mb-3">Quick Actions</h5>
              <Button
                onClick={() => setShowAddHoldingModal(true)}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "8px",
                }}
                className="w-100"
              >
                <i className="bi bi-plus-circle me-2"></i>Add Holding
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Key Metrics */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <div style={metricBoxStyle}>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Portfolio Value
              </small>
              <h4 className="mt-2 fw-bold">
                ₹
                {metrics.currentValue.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h4>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div style={metricBoxStyle}>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Total Return
              </small>
              <h4
                className="mt-2 fw-bold"
                style={{ color: getReturnColor(metrics.totalReturn) }}
              >
                {metrics.totalReturn.toFixed(2)}%
              </h4>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Gain: ₹
                {metrics.gains.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </small>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div style={metricBoxStyle}>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Volatility
              </small>
              <h4 className="mt-2 fw-bold">{metrics.volatility.toFixed(2)}%</h4>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Drawdown: {metrics.maxDrawdown.toFixed(2)}%
              </small>
            </div>
          </Col>
        </Row>

        {/* Advanced Return Calculations */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <div
              style={{
                ...metricBoxStyle,
                background: darkMode
                  ? "linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)",
                border: darkMode
                  ? "1px solid rgba(34, 197, 94, 0.3)"
                  : "1px solid rgba(34, 197, 94, 0.2)",
              }}
            >
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                <i className="bi bi-graph-up me-2"></i>CAGR
              </small>
              <h4
                className="mt-2 fw-bold"
                style={{ color: getReturnColor(cagr) }}
              >
                {cagr.toFixed(2)}%
              </h4>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Compound Annual Growth Rate
              </small>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div
              style={{
                ...metricBoxStyle,
                background: darkMode
                  ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)",
                border: darkMode
                  ? "1px solid rgba(59, 130, 246, 0.3)"
                  : "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                <i className="bi bi-percent me-2"></i>Total Return
              </small>
              <h4
                className="mt-2 fw-bold"
                style={{ color: getReturnColor(totalReturn) }}
              >
                {totalReturn.toFixed(2)}%
              </h4>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Overall Portfolio Performance
              </small>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div
              style={{
                ...metricBoxStyle,
                background: darkMode
                  ? "linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)"
                  : "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
                border: darkMode
                  ? "1px solid rgba(168, 85, 247, 0.3)"
                  : "1px solid rgba(168, 85, 247, 0.2)",
              }}
            >
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                <i className="bi bi-calculator me-2"></i>IRR
              </small>
              <h4
                className="mt-2 fw-bold"
                style={{ color: getReturnColor(irr) }}
              >
                {irr.toFixed(2)}%
              </h4>
              <small style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                Internal Rate of Return
              </small>
            </div>
          </Col>
        </Row>

        {/* Diversification & Metrics */}
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Card style={cardStyle} className="h-100 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Diversification Score</h5>
                <Badge
                  bg={
                    metrics.diversificationScore > 70
                      ? "success"
                      : metrics.diversificationScore > 40
                        ? "warning"
                        : "danger"
                  }
                >
                  {metrics.diversificationScore.toFixed(0)}/100
                </Badge>
              </div>
              <div
                style={{
                  height: "30px",
                  background: darkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${metrics.diversificationScore}%`,
                    background:
                      "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              <small
                style={{
                  color: darkMode ? "#9ca3af" : "#6b7280",
                  display: "block",
                  marginTop: "1rem",
                }}
              >
                {metrics.diversificationScore > 70
                  ? "✓ Well diversified portfolio"
                  : metrics.diversificationScore > 40
                    ? "⚠ Consider diversifying further"
                    : "✗ Low diversification - high concentration risk"}
              </small>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card style={cardStyle} className="h-100 p-4">
              <h5 className="mb-3">Sector Allocation</h5>
              <div>
                {metrics.sectorAllocation.slice(0, 5).map((sector, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <small className="fw-500">{sector.sector}</small>
                      <small>{sector.percentage.toFixed(1)}%</small>
                    </div>
                    <div
                      style={{
                        height: "8px",
                        background: darkMode
                          ? "rgba(0,0,0,0.3)"
                          : "rgba(0,0,0,0.1)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${sector.percentage}%`,
                          background: `hsl(${(idx * 60) % 360}, 70%, 50%)`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Holdings Table */}
        <Card style={cardStyle} className="p-4 mb-4">
          <h5 className="mb-4">Your Holdings</h5>
          <div style={{ overflowX: "auto" }}>
            <Table
              responsive
              style={{ color: darkMode ? "#fff" : "#1a202c", marginBottom: 0 }}
            >
              <thead
                style={{
                  borderTopColor: darkMode
                    ? "rgba(139, 92, 246, 0.2)"
                    : "rgba(139, 92, 246, 0.15)",
                }}
              >
                <tr>
                  <th>Symbol</th>
                  <th>Quantity</th>
                  <th>Buy Price</th>
                  <th>Current Price</th>
                  <th>Gain/Loss</th>
                  <th>Sector</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {(metrics.holdings || [])
                  .filter((holding) => holding && holding.symbol)
                  .map((holding) => {
                  const buyPrice = holding.buyPrice || 0;
                  const currentPrice = holding.currentPrice || 0;
                  const currentValue = holding.currentValue || 0;
                  const gainLoss =
                    buyPrice > 0
                      ? ((currentPrice - buyPrice) / buyPrice) * 100
                      : 0;
                  return (
                    <tr
                      key={holding.id}
                      style={{
                        borderBottomColor: darkMode
                          ? "rgba(139, 92, 246, 0.1)"
                          : "rgba(139, 92, 246, 0.08)",
                      }}
                    >
                      <td>
                        <strong>{holding.symbol}</strong>
                      </td>
                      <td>{holding.quantity}</td>
                      <td>
                        ₹
                        {buyPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        ₹
                        {currentPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <span style={{ color: getReturnColor(gainLoss) }}>
                          {gainLoss.toFixed(2)}%
                        </span>
                      </td>
                      <td>
                        <Badge bg="secondary">{holding.sector}</Badge>
                      </td>
                      <td>
                        ₹
                        {currentValue.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => handleShowChart(holding)}
                          style={{
                            background:
                              "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                            border: "none",
                            borderRadius: "6px",
                            color: "#1a202c",
                            fontWeight: "600",
                            padding: "0.4rem 0.8rem",
                            fontSize: "0.85rem",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 6px 15px rgba(251, 191, 36, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <i className="bi bi-candlestick me-1"></i>Performance
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card>

        {/* Add Holding Modal */}
        <Modal
          show={showAddHoldingModal}
          onHide={() => setShowAddHoldingModal(false)}
          centered
          style={{ filter: darkMode ? "invert(1)" : "none" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Holding</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Stock Symbol</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., AAPL"
                  value={newHolding.symbol}
                  onChange={(e) =>
                    setNewHolding({
                      ...newHolding,
                      symbol: e.target.value.toUpperCase(),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., Apple Inc."
                  value={newHolding.name}
                  onChange={(e) =>
                    setNewHolding({ ...newHolding, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Number of shares"
                  value={newHolding.quantity}
                  onChange={(e) =>
                    setNewHolding({
                      ...newHolding,
                      quantity: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Buy Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Purchase price per share"
                  value={newHolding.buyPrice}
                  onChange={(e) =>
                    setNewHolding({
                      ...newHolding,
                      buyPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Current Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Current market price"
                  value={newHolding.currentPrice}
                  onChange={(e) =>
                    setNewHolding({
                      ...newHolding,
                      currentPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sector</Form.Label>
                <Form.Select
                  value={newHolding.sector}
                  onChange={(e) =>
                    setNewHolding({ ...newHolding, sector: e.target.value })
                  }
                >
                  <option>Technology</option>
                  <option>Healthcare</option>
                  <option>Finance</option>
                  <option>Consumer Staples</option>
                  <option>Consumer Discretionary</option>
                  <option>Industrials</option>
                  <option>Energy</option>
                  <option>Real Estate</option>
                  <option>Materials</option>
                  <option>Utilities</option>
                  <option>Other</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAddHoldingModal(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
              }}
              onClick={handleAddHolding}
            >
              Add Holding
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Candlestick Chart Modal */}
        {selectedHolding && (
          <CandlestickChart
            show={showChart}
            onHide={() => setShowChart(false)}
            share={{
              symbol: selectedHolding.symbol,
              currentPrice: selectedHolding.currentPrice,
            }}
            purchasePrice={selectedHolding.buyPrice}
            darkMode={darkMode}
          />
        )}
      </Container>
    </section>
  );
};

export default PortfolioDashboard;
