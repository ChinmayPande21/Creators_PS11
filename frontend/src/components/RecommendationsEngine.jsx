import React, { useContext } from "react";
import { Container, Row, Col, Card, Badge, Alert } from "react-bootstrap";
import { PortfolioContext } from "../context/PortfolioContext";

const RecommendationsEngine = ({ darkMode }) => {
  const { activePortfolio, getPortfolioMetrics } = useContext(PortfolioContext);

  const metrics = getPortfolioMetrics();

  if (!metrics || !activePortfolio) {
    return <div>Loading...</div>;
  }

  const recommendationsStyle = {
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
  };

  const getRecommendationColor = (severity) => {
    switch (severity) {
      case "high":
        return { bg: "#ef4444", icon: "⚠️" };
      case "medium":
        return { bg: "#f59e0b", icon: "⚡" };
      case "low":
        return { bg: "#3b82f6", icon: "ℹ️" };
      default:
        return { bg: "#10b981", icon: "✓" };
    }
  };

  const getRiskProfileTargets = () => {
    const targets = {
      conservative: {
        stocks: 40,
        bonds: 50,
        cash: 10,
        description: "Focus on capital preservation with moderate growth",
        color: "#06b6d4",
      },
      moderate: {
        stocks: 60,
        bonds: 30,
        cash: 10,
        description: "Balance between growth and stability",
        color: "#8b5cf6",
      },
      aggressive: {
        stocks: 80,
        bonds: 15,
        cash: 5,
        description: "Maximize growth with higher risk tolerance",
        color: "#ef4444",
      },
    };

    return targets[activePortfolio.riskProfile] || targets.moderate;
  };

  const calculateAssetAllocation = () => {
    const totalValue = metrics.holdings.reduce(
      (sum, h) => sum + h.currentValue,
      0,
    );

    const stocksValue = metrics.holdings
      .filter((h) => h.assetType === "stock")
      .reduce((sum, h) => sum + h.currentValue, 0);
    const bondsValue = metrics.holdings
      .filter((h) => h.assetType === "bond")
      .reduce((sum, h) => sum + h.currentValue, 0);
    const cashValue = metrics.holdings
      .filter((h) => h.assetType === "cash")
      .reduce((sum, h) => sum + h.currentValue, 0);

    return {
      stocks: totalValue > 0 ? (stocksValue / totalValue) * 100 : 0,
      bonds: totalValue > 0 ? (bondsValue / totalValue) * 100 : 0,
      cash: totalValue > 0 ? (cashValue / totalValue) * 100 : 0,
    };
  };

  const currentAllocation = calculateAssetAllocation();
  const target = getRiskProfileTargets();

  const RecommendationCard = ({ rec, index }) => {
    const color = getRecommendationColor(rec.severity);

    return (
      <Card
        key={index}
        style={{
          ...cardStyle,
          borderLeft: `4px solid ${color.bg}`,
        }}
        className="mb-3 p-4"
      >
        <div className="d-flex gap-3">
          <div
            style={{
              fontSize: "1.5rem",
              minWidth: "40px",
            }}
          >
            {color.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h6 style={{ color: color.bg }} className="mb-2">
              {rec.action.replace(/_/g, " ")}
            </h6>
            <p
              className="mb-2"
              style={{ color: darkMode ? "#d1d5db" : "#6b7280" }}
            >
              {rec.description}
            </p>
            {rec.amount && (
              <small style={{ color: darkMode ? "#9ca3af" : "#9ca3af" }}>
                💰 Amount: $
                {rec.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </small>
            )}
            {rec.currentVolatility && (
              <small
                style={{
                  color: darkMode ? "#9ca3af" : "#9ca3af",
                  display: "block",
                }}
              >
                📊 Current Volatility: {rec.currentVolatility.toFixed(2)}%
              </small>
            )}
          </div>
          <Badge
            bg={
              rec.severity === "high"
                ? "danger"
                : rec.severity === "medium"
                  ? "warning"
                  : "info"
            }
          >
            {rec.severity}
          </Badge>
        </div>
      </Card>
    );
  };

  return (
    <section style={recommendationsStyle} className="py-5 min-vh-100">
      <Container>
        {/* Header */}
        <div className="mb-5">
          <h1 className="mb-2 fw-bold">
            <i
              className="bi bi-lightbulb me-3"
              style={{ color: "#f59e0b" }}
            ></i>
            Intelligent Recommendations
          </h1>
          <p style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
            AI-powered recommendations aligned with your{" "}
            {activePortfolio.riskProfile} risk profile
          </p>
        </div>

        {/* Risk Profile Section */}
        <Row className="mb-5 g-4">
          <Col md={6}>
            <Card style={cardStyle} className="h-100 p-4">
              <h5 className="mb-4">Your Risk Profile</h5>
              <div
                style={{
                  padding: "1.5rem",
                  background: `${target.color}20`,
                  borderRadius: "12px",
                  border: `2px solid ${target.color}`,
                  marginBottom: "1.5rem",
                }}
              >
                <h6
                  style={{
                    color: target.color,
                    marginBottom: "0.5rem",
                    textTransform: "uppercase",
                  }}
                >
                  {activePortfolio.riskProfile}
                </h6>
                <p
                  style={{
                    color: darkMode ? "#d1d5db" : "#6b7280",
                    marginBottom: 0,
                  }}
                >
                  {target.description}
                </p>
              </div>
              <div>
                <p
                  style={{
                    color: darkMode ? "#9ca3af" : "#6b7280",
                    marginBottom: "0.75rem",
                  }}
                >
                  <small>Target Allocation:</small>
                </p>
                <div className="d-flex gap-2 flex-wrap">
                  <Badge bg="primary">{target.stocks}% Stocks</Badge>
                  <Badge bg="secondary">{target.bonds}% Bonds</Badge>
                  <Badge bg="success">{target.cash}% Cash</Badge>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card style={cardStyle} className="h-100 p-4">
              <h5 className="mb-4">Current Allocation</h5>
              <div>
                {[
                  {
                    label: "Stocks",
                    value: currentAllocation.stocks,
                    target: target.stocks,
                    color: "#3b82f6",
                  },
                  {
                    label: "Bonds",
                    value: currentAllocation.bonds,
                    target: target.bonds,
                    color: "#8b5cf6",
                  },
                  {
                    label: "Cash",
                    value: currentAllocation.cash,
                    target: target.cash,
                    color: "#10b981",
                  },
                ].map((asset, idx) => (
                  <div key={idx} className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>{asset.label}</span>
                      <small style={{ color: asset.color }}>
                        {asset.value.toFixed(1)}% (Target: {asset.target}%)
                      </small>
                    </div>
                    <div
                      style={{
                        height: "12px",
                        background: darkMode
                          ? "rgba(0,0,0,0.3)"
                          : "rgba(0,0,0,0.1)",
                        borderRadius: "6px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${asset.value}%`,
                          background: asset.color,
                          transition: "width 0.3s ease",
                        }}
                      ></div>
                      <div
                        style={{
                          position: "absolute",
                          top: "0",
                          left: `${asset.target}%`,
                          width: "2px",
                          height: "100%",
                          background: darkMode
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.3)",
                          transform: "translateX(-50%)",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Recommendations List */}
        <Row className="mb-5">
          <Col>
            <Card style={cardStyle} className="p-4">
              <h5 className="mb-4">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Personalized Recommendations ({metrics.recommendations.length})
              </h5>
              {metrics.recommendations.length > 0 ? (
                <div>
                  {metrics.recommendations.map((rec, idx) => (
                    <RecommendationCard key={idx} rec={rec} index={idx} />
                  ))}
                </div>
              ) : (
                <Alert variant="success" className="mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  Your portfolio is well-aligned with your risk profile. No
                  major recommendations at this time.
                </Alert>
              )}
            </Card>
          </Col>
        </Row>

        {/* Action Items */}
        <Row>
          <Col>
            <Card style={cardStyle} className="p-4">
              <h5 className="mb-4">Suggested Action Plan</h5>
              <div>
                {[
                  {
                    priority: "high",
                    action: "Review Holdings",
                    description:
                      "Analyze underperforming assets and consider rebalancing to align with your target allocation.",
                  },
                  {
                    priority: "medium",
                    action: "Diversify Portfolio",
                    description:
                      "Add positions in underrepresented sectors to improve diversification.",
                  },
                  {
                    priority: "low",
                    action: "Monitor Performance",
                    description:
                      "Track your portfolio quarterly and make adjustments as needed.",
                  },
                  {
                    priority: "low",
                    action: "Dollar-Cost Averaging",
                    description:
                      "Consider regular investments to average out market volatility over time.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "1.25rem",
                      background: darkMode
                        ? "rgba(0,0,0,0.2)"
                        : "rgba(0,0,0,0.05)",
                      borderRadius: "8px",
                      marginBottom: "0.75rem",
                      borderLeft:
                        item.priority === "high"
                          ? "4px solid #ef4444"
                          : item.priority === "medium"
                            ? "4px solid #f59e0b"
                            : "4px solid #3b82f6",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <h6 className="mb-1">{item.action}</h6>
                        <small
                          style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}
                        >
                          {item.description}
                        </small>
                      </div>
                      <Badge
                        bg={
                          item.priority === "high"
                            ? "danger"
                            : item.priority === "medium"
                              ? "warning"
                              : "info"
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RecommendationsEngine;
