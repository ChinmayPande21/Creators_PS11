import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Tabs,
  Tab,
  ListGroup,
} from "react-bootstrap";
import { PortfolioContext } from "../context/PortfolioContext";

const PortfolioAnalytics = ({ darkMode }) => {
  const { activePortfolio, getPortfolioMetrics } = useContext(PortfolioContext);
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = getPortfolioMetrics();

  if (!metrics || !activePortfolio) {
    return <div>Loading...</div>;
  }

  const analyticsStyle = {
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

  const chartBarStyle = {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    height: "100%",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  };

  const getHealthStatus = () => {
    const healthFactors = [];

    if (metrics.diversificationScore > 70)
      healthFactors.push("✓ Well diversified");
    else if (metrics.diversificationScore < 40)
      healthFactors.push("⚠ Low diversification");

    if (metrics.volatility < 15) healthFactors.push("✓ Low risk");
    else if (metrics.volatility > 30) healthFactors.push("⚠ High volatility");

    if (metrics.totalReturn > 0) healthFactors.push("✓ Positive returns");
    else healthFactors.push("✗ Negative returns");

    return healthFactors;
  };

  const getTrendAnalysis = () => {
    const trends = [];

    const totalValue = metrics.holdings.reduce(
      (sum, h) => sum + h.currentValue,
      0,
    );
    const topPerformer = [...metrics.holdings].sort((a, b) => {
      const aReturn = ((a.currentPrice - a.buyPrice) / a.buyPrice) * 100;
      const bReturn = ((b.currentPrice - b.buyPrice) / b.buyPrice) * 100;
      return bReturn - aReturn;
    })[0];

    const worstPerformer = [...metrics.holdings].sort((a, b) => {
      const aReturn = ((b.currentPrice - b.buyPrice) / b.buyPrice) * 100;
      const bReturn = ((a.currentPrice - a.buyPrice) / a.buyPrice) * 100;
      return aReturn - bReturn;
    })[0];

    return { topPerformer, worstPerformer, totalValue };
  };

  const trendData = getTrendAnalysis();
  const healthStatus = getHealthStatus();

  return (
    <section style={analyticsStyle} className="py-5 min-vh-100">
      <Container>
        {/* Header */}
        <div className="mb-5">
          <h1 className="mb-2 fw-bold">
            <i
              className="bi bi-graph-up-arrow me-3"
              style={{ color: "#8b5cf6" }}
            ></i>
            Portfolio Analytics & Insights
          </h1>
          <p style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
            Deep analysis of your portfolio performance, risk metrics, and trend
            analysis
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          id="analytics-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
          style={{
            borderBottomColor: darkMode
              ? "rgba(139, 92, 246, 0.2)"
              : "rgba(139, 92, 246, 0.15)",
          }}
        >
          {/* Performance Overview Tab */}
          <Tab
            eventKey="overview"
            title="Performance Overview"
            className="pt-4"
          >
            <Row className="g-4">
              <Col md={6} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Performance Metrics</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Total Invested</span>
                        <strong style={{ color: "#8b5cf6" }}>
                          ₹
                          {metrics.totalInvested.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Current Value</span>
                        <strong style={{ color: "#10b981" }}>
                          ₹
                          {metrics.currentValue.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Total Gain/Loss</span>
                        <strong
                          style={{
                            color: metrics.gains >= 0 ? "#10b981" : "#ef4444",
                          }}
                        >
                          ₹
                          {metrics.gains.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Return %</span>
                        <strong
                          style={{
                            color:
                              metrics.totalReturn >= 0 ? "#10b981" : "#ef4444",
                          }}
                        >
                          {metrics.totalReturn.toFixed(2)}%
                        </strong>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>

              <Col md={6} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Risk Metrics</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Volatility (Annual)</span>
                        <strong style={{ color: "#f59e0b" }}>
                          {metrics.volatility.toFixed(2)}%
                        </strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Maximum Drawdown</span>
                        <strong style={{ color: "#ef4444" }}>
                          {metrics.maxDrawdown.toFixed(2)}%
                        </strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Diversification</span>
                        <strong style={{ color: "#8b5cf6" }}>
                          {metrics.diversificationScore.toFixed(0)}/100
                        </strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Holdings</span>
                        <strong style={{ color: "#06b6d4" }}>
                          {metrics.holdings.length}
                        </strong>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Sector Analysis Tab */}
          <Tab eventKey="sectors" title="Sector Analysis" className="pt-4">
            <Row className="g-4">
              <Col lg={8} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Sector Breakdown</h5>
                  <div>
                    {metrics.sectorAllocation.map((sector, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="d-flex justify-content-between mb-2">
                          <strong>{sector.sector}</strong>
                          <div>
                            <Badge bg="info" className="me-2">
                              {sector.percentage.toFixed(1)}%
                            </Badge>
                            <span
                              style={{
                                color: darkMode ? "#9ca3af" : "#6b7280",
                              }}
                            >
                              $
                              {sector.value.toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            height: "24px",
                            background: darkMode
                              ? "rgba(0,0,0,0.2)"
                              : "rgba(0,0,0,0.08)",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              ...chartBarStyle,
                              width: `${sector.percentage}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>

              <Col lg={4} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Sector Statistics</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between">
                        <span>Total Sectors</span>
                        <strong>{metrics.sectorAllocation.length}</strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between">
                        <span>Top Sector</span>
                        <strong>{metrics.sectorAllocation[0]?.sector}</strong>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                        border: darkMode
                          ? "1px solid rgba(139, 92, 246, 0.1)"
                          : "1px solid rgba(139, 92, 246, 0.08)",
                        color: darkMode ? "#fff" : "#1a202c",
                      }}
                      className="py-3"
                    >
                      <div className="d-flex justify-content-between">
                        <span>Concentration</span>
                        <strong>
                          {metrics.sectorAllocation[0]?.percentage.toFixed(1)}%
                        </strong>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Trend Analysis Tab */}
          <Tab eventKey="trends" title="Trend Analysis" className="pt-4">
            <Row className="g-4">
              <Col md={6} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Top Performer</h5>
                  {trendData.topPerformer && (
                    <div>
                      <div
                        style={{
                          padding: "1.5rem",
                          background: darkMode
                            ? "rgba(16, 185, 129, 0.1)"
                            : "rgba(16, 185, 129, 0.08)",
                          borderRadius: "12px",
                          border: "1px solid rgba(16, 185, 129, 0.3)",
                        }}
                        className="mb-3"
                      >
                        <h6 className="mb-2" style={{ color: "#10b981" }}>
                          {trendData.topPerformer.symbol}
                        </h6>
                        <p
                          style={{
                            color: darkMode ? "#9ca3af" : "#6b7280",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {trendData.topPerformer.name}
                        </p>
                        <h4
                          style={{
                            color: "#10b981",
                            marginTop: "1rem",
                          }}
                        >
                          +
                          {(
                            ((trendData.topPerformer.currentPrice -
                              trendData.topPerformer.buyPrice) /
                              trendData.topPerformer.buyPrice) *
                            100
                          ).toFixed(2)}
                          %
                        </h4>
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item
                          style={{
                            background: "transparent",
                            border: darkMode
                              ? "1px solid rgba(139, 92, 246, 0.1)"
                              : "1px solid rgba(139, 92, 246, 0.08)",
                            color: darkMode ? "#fff" : "#1a202c",
                          }}
                          className="py-3"
                        >
                          <div className="d-flex justify-content-between">
                            <span>Sector</span>
                            <strong>{trendData.topPerformer.sector}</strong>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                          style={{
                            background: "transparent",
                            border: darkMode
                              ? "1px solid rgba(139, 92, 246, 0.1)"
                              : "1px solid rgba(139, 92, 246, 0.08)",
                            color: darkMode ? "#fff" : "#1a202c",
                          }}
                          className="py-3"
                        >
                          <div className="d-flex justify-content-between">
                            <span>Current Value</span>
                            <strong>
                              $
                              {trendData.topPerformer.currentValue.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
                            </strong>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  )}
                </Card>
              </Col>

              <Col md={6} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Worst Performer</h5>
                  {trendData.worstPerformer && (
                    <div>
                      <div
                        style={{
                          padding: "1.5rem",
                          background: darkMode
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgba(239, 68, 68, 0.08)",
                          borderRadius: "12px",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                        }}
                        className="mb-3"
                      >
                        <h6 className="mb-2" style={{ color: "#ef4444" }}>
                          {trendData.worstPerformer.symbol}
                        </h6>
                        <p
                          style={{
                            color: darkMode ? "#9ca3af" : "#6b7280",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {trendData.worstPerformer.name}
                        </p>
                        <h4
                          style={{
                            color: "#ef4444",
                            marginTop: "1rem",
                          }}
                        >
                          {(
                            ((trendData.worstPerformer.currentPrice -
                              trendData.worstPerformer.buyPrice) /
                              trendData.worstPerformer.buyPrice) *
                            100
                          ).toFixed(2)}
                          %
                        </h4>
                      </div>
                      <ListGroup variant="flush">
                        <ListGroup.Item
                          style={{
                            background: "transparent",
                            border: darkMode
                              ? "1px solid rgba(139, 92, 246, 0.1)"
                              : "1px solid rgba(139, 92, 246, 0.08)",
                            color: darkMode ? "#fff" : "#1a202c",
                          }}
                          className="py-3"
                        >
                          <div className="d-flex justify-content-between">
                            <span>Sector</span>
                            <strong>{trendData.worstPerformer.sector}</strong>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                          style={{
                            background: "transparent",
                            border: darkMode
                              ? "1px solid rgba(139, 92, 246, 0.1)"
                              : "1px solid rgba(139, 92, 246, 0.08)",
                            color: darkMode ? "#fff" : "#1a202c",
                          }}
                          className="py-3"
                        >
                          <div className="d-flex justify-content-between">
                            <span>Current Value</span>
                            <strong>
                              $
                              {trendData.worstPerformer.currentValue.toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
                            </strong>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          </Tab>

          {/* Portfolio Health Tab */}
          <Tab eventKey="health" title="Portfolio Health" className="pt-4">
            <Row>
              <Col lg={8} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Health Check Summary</h5>
                  <div>
                    {healthStatus.map((status, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "1rem",
                          background: darkMode
                            ? "rgba(0,0,0,0.2)"
                            : "rgba(0,0,0,0.05)",
                          borderRadius: "8px",
                          marginBottom: "0.75rem",
                          borderLeft: status.includes("✓")
                            ? "4px solid #10b981"
                            : status.includes("⚠")
                              ? "4px solid #f59e0b"
                              : "4px solid #ef4444",
                        }}
                      >
                        {status}
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>

              <Col lg={4} className="mb-3">
                <Card style={cardStyle} className="h-100 p-4">
                  <h5 className="mb-4">Overall Score</h5>
                  <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                      }}
                    >
                      <strong style={{ fontSize: "2rem", color: "white" }}>
                        {(
                          (metrics.diversificationScore +
                            (100 - Math.min(metrics.volatility * 3, 100)) +
                            (metrics.totalReturn > 0 ? 80 : 20)) /
                          3
                        ).toFixed(0)}
                      </strong>
                    </div>
                    <p style={{ color: darkMode ? "#9ca3af" : "#6b7280" }}>
                      Portfolio Health Score
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default PortfolioAnalytics;
