import React, { useMemo } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from "recharts";

const CandlestickChart = ({ show, onHide, share, purchasePrice, darkMode }) => {
  // Generate historical candlestick data for the last 5 years
  const generateHistoricalData = (basePrice) => {
    const data = [];
    const today = new Date();

    for (let i = 60; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);

      // Generate realistic price movements
      const volatility = 0.1; // 10% volatility
      const trend = 0.02; // 2% monthly trend
      const randomFactor = Math.random() * volatility - volatility / 2;
      const adjustedPrice = basePrice * (1 + trend * (60 - i) + randomFactor);

      const open = adjustedPrice * (0.98 + Math.random() * 0.04);
      const close = adjustedPrice * (0.98 + Math.random() * 0.04);
      const high = Math.max(open, close) * (1 + Math.random() * 0.03);
      const low = Math.min(open, close) * (1 - Math.random() * 0.03);

      data.push({
        month: date.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        open: parseFloat(open.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        avg: parseFloat(((open + close) / 2).toFixed(2)),
      });
    }

    return data;
  };

  const historicalData = useMemo(
    () => generateHistoricalData(share.currentPrice),
    [share.currentPrice],
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            background: darkMode
              ? "rgba(31, 41, 55, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            border: darkMode
              ? "1px solid rgba(139, 92, 246, 0.3)"
              : "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "8px",
            padding: "0.8rem",
            color: darkMode ? "#e5e7eb" : "#1a202c",
            fontSize: "0.85rem",
          }}
        >
          <p style={{ margin: "0.2rem 0", fontWeight: "600" }}>{data.month}</p>
          <p style={{ margin: "0.2rem 0", color: "#8b5cf6" }}>
            Open: ₹{data.open.toFixed(2)}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#22c55e" }}>
            High: ₹{data.high.toFixed(2)}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#ef4444" }}>
            Low: ₹{data.low.toFixed(2)}
          </p>
          <p style={{ margin: "0.2rem 0", color: "#fbbf24" }}>
            Close: ₹{data.close.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      style={{
        backgroundColor: darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
      }}
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
          <i className="bi bi-candlestick me-2"></i>
          {share.symbol} - Performance Chart
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          background: darkMode ? "#1f2937" : "#f9fafb",
          color: darkMode ? "white" : "#1a202c",
        }}
      >
        {/* Chart Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: darkMode
                ? "rgba(139, 92, 246, 0.1)"
                : "rgba(139, 92, 246, 0.05)",
              padding: "1rem",
              borderRadius: "8px",
              border: darkMode
                ? "1px solid rgba(139, 92, 246, 0.2)"
                : "1px solid rgba(139, 92, 246, 0.15)",
            }}
          >
            <small style={{ color: darkMode ? "#b0b9c6" : "#6b7280" }}>
              Current Price
            </small>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                margin: "0.5rem 0 0 0",
                color: "#8b5cf6",
              }}
            >
              ₹{share.currentPrice.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              background: darkMode
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(34, 197, 94, 0.05)",
              padding: "1rem",
              borderRadius: "8px",
              border: darkMode
                ? "1px solid rgba(34, 197, 94, 0.2)"
                : "1px solid rgba(34, 197, 94, 0.15)",
            }}
          >
            <small style={{ color: darkMode ? "#b0b9c6" : "#6b7280" }}>
              Your Purchase Price
            </small>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                margin: "0.5rem 0 0 0",
                color: "#22c55e",
              }}
            >
              ₹{purchasePrice.toFixed(2)}
            </p>
          </div>

          <div
            style={{
              background: darkMode
                ? `rgba(${share.currentPrice >= purchasePrice ? "34, 197, 94" : "239, 68, 68"}, 0.1)`
                : `rgba(${share.currentPrice >= purchasePrice ? "34, 197, 94" : "239, 68, 68"}, 0.05)`,
              padding: "1rem",
              borderRadius: "8px",
              border: darkMode
                ? `1px solid rgba(${share.currentPrice >= purchasePrice ? "34, 197, 94" : "239, 68, 68"}, 0.2)`
                : `1px solid rgba(${share.currentPrice >= purchasePrice ? "34, 197, 94" : "239, 68, 68"}, 0.15)`,
            }}
          >
            <small style={{ color: darkMode ? "#b0b9c6" : "#6b7280" }}>
              Profit/Loss
            </small>
            <p
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                margin: "0.5rem 0 0 0",
                color:
                  share.currentPrice >= purchasePrice ? "#22c55e" : "#ef4444",
              }}
            >
              {share.currentPrice >= purchasePrice ? "+" : ""}
              {(
                ((share.currentPrice - purchasePrice) * 100) /
                purchasePrice
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>

        {/* Chart */}
        <div
          style={{
            background: darkMode
              ? "rgba(17, 24, 39, 0.5)"
              : "rgba(255, 255, 255, 0.5)",
            padding: "1rem",
            borderRadius: "12px",
            border: darkMode
              ? "1px solid rgba(139, 92, 246, 0.2)"
              : "1px solid rgba(139, 92, 246, 0.15)",
            marginBottom: "1rem",
          }}
        >
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={historicalData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={
                  darkMode
                    ? "rgba(139, 92, 246, 0.2)"
                    : "rgba(139, 92, 246, 0.1)"
                }
              />
              <XAxis
                dataKey="month"
                stroke={darkMode ? "#9ca3af" : "#6b7280"}
                style={{ fontSize: "0.8rem" }}
                interval={Math.floor(historicalData.length / 6)}
              />
              <YAxis
                stroke={darkMode ? "#9ca3af" : "#6b7280"}
                style={{ fontSize: "0.8rem" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  color: darkMode ? "#d1d5db" : "#6b7280",
                  paddingTop: "1rem",
                }}
              />

              {/* High Price */}
              <Line
                type="monotone"
                dataKey="high"
                stroke="#22c55e"
                strokeWidth={2}
                name="High Price"
                dot={false}
              />

              {/* Low Price */}
              <Line
                type="monotone"
                dataKey="low"
                stroke="#ef4444"
                strokeWidth={2}
                name="Low Price"
                dot={false}
              />

              {/* Average Price */}
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Average Price"
                dot={false}
              />

              {/* Purchase Price Line */}
              <Line
                type="linear"
                dataKey={() => purchasePrice}
                stroke="#22c55e"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                name="Your Purchase Price"
                isAnimationActive={false}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            fontSize: "0.85rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "15px",
                backgroundColor: "#22c55e",
                opacity: 0.8,
                borderRadius: "2px",
              }}
            />
            <span>Bullish (Close ≥ Open)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "15px",
                backgroundColor: "#ef4444",
                opacity: 0.8,
                borderRadius: "2px",
              }}
            />
            <span>Bearish (Close &lt; Open)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div
              style={{
                width: "20px",
                height: "2px",
                backgroundColor: "#22c55e",
                marginRight: "0.25rem",
              }}
            />
            <span>—— Your Purchase</span>
          </div>
        </div>
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
          onClick={onHide}
          style={{
            background: darkMode
              ? "rgba(139, 92, 246, 0.2)"
              : "rgba(139, 92, 246, 0.1)",
            border: "none",
            color: darkMode ? "white" : "#1a202c",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CandlestickChart;
