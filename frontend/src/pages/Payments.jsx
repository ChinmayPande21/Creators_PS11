import React, { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { usePayments } from "../context/PaymentsContext";

const MONTHLY_RENT = 5000;
const MAINTENANCE_FEE_PER_MONTH = 250;
const ANNUAL_DISCOUNT_RATE = 0.1; // 10% off on annual payment

const formatINR = (amount) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${Math.round(amount)}`;
  }
};

const StatusPill = ({ status }) => {
  const isDone = status === "done";
  return (
    <Badge
      bg={isDone ? "success" : "warning"}
      text={isDone ? "light" : "dark"}
      style={{
        borderRadius: 999,
        padding: "0.45rem 0.7rem",
        fontWeight: 900,
      }}
    >
      {isDone ? "Done" : "Pending"}
    </Badge>
  );
};

const Payments = () => {
  const { userRole } = useAuth();
  const isWarden = userRole === "warden";
  const { payments, stats, createPayment } = usePayments();

  const [viewStatus, setViewStatus] = useState("pending");
  const [paymentType, setPaymentType] = useState("Monthly");
  const [months, setMonths] = useState(1);
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [note, setNote] = useState("");
  const [lastPaymentSummary, setLastPaymentSummary] = useState(null);

  const calculation = useMemo(() => {
    const monthlyBase = MONTHLY_RENT + MAINTENANCE_FEE_PER_MONTH;

    if (paymentType === "Annual") {
      const base = monthlyBase * 12;
      const discount = Math.round(base * ANNUAL_DISCOUNT_RATE);
      const total = base - discount;
      return {
        months: 12,
        base,
        discount,
        total,
      };
    }

    const safeMonths = Math.min(12, Math.max(1, Number(months) || 1));
    const base = monthlyBase * safeMonths;
    return {
      months: safeMonths,
      base,
      discount: 0,
      total: base,
    };
  }, [months, paymentType]);

  const handlePayNow = () => {
    const id = createPayment({
      paymentType,
      months: calculation.months,
      total: calculation.total,
      paymentMode,
      note: note.trim(),
    });

    setLastPaymentSummary({
      id,
      paymentType,
      months: calculation.months,
      total: calculation.total,
      paymentMode,
      note: note.trim(),
      paidAt: Date.now(),
      status: "pending",
    });
    setViewStatus("pending");
  };

  const visiblePayments = useMemo(() => {
    const filtered = payments.filter((p) =>
      viewStatus === "done" ? p.status === "done" : p.status !== "done",
    );
    return [...filtered].sort((a, b) => b.createdAt - a.createdAt);
  }, [payments, viewStatus]);

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        paddingTop: "2rem",
        paddingBottom: "2rem",
      }}
    >
      <Container fluid className="px-3 px-md-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <h1
              className="mb-1"
              style={{ fontWeight: 900, letterSpacing: "-0.5px" }}
            >
              Payments
            </h1>
            <div className="text-muted">Manage rent, fees, and receipts.</div>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <Badge
              bg=""
              style={{
                background: "rgba(139, 92, 246, 0.12)",
                color: "#5b21b6",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                padding: "0.6rem 0.9rem",
                borderRadius: 999,
                fontWeight: 900,
              }}
            >
              Pending: {stats.pending}
            </Badge>
            <Badge
              bg="success"
              style={{
                padding: "0.6rem 0.9rem",
                borderRadius: 999,
                fontWeight: 900,
              }}
            >
              Done: {stats.done}
            </Badge>
            <Badge
              bg=""
              style={{
                background: "rgba(34, 197, 94, 0.12)",
                color: "#15803d",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                padding: "0.6rem 0.9rem",
                borderRadius: 999,
                fontWeight: 800,
              }}
            >
              <i className="bi bi-lock-fill me-2"></i>
              Secure Payments
            </Badge>
          </div>
        </div>

        <Card
          className="mb-4"
          style={{
            borderRadius: 18,
            border: "1px solid rgba(139, 92, 246, 0.15)",
            boxShadow: "0 8px 30px rgba(102, 126, 234, 0.08)",
          }}
        >
          <Card.Body className="p-3 p-md-4 d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div style={{ fontWeight: 900 }}>
              {isWarden ? "Student Payments" : "Your Payments"}
            </div>
            <div className="d-flex gap-2">
              <Button
                variant={
                  viewStatus === "pending" ? "primary" : "outline-primary"
                }
                onClick={() => setViewStatus("pending")}
                style={{ borderRadius: 999, fontWeight: 900 }}
              >
                Pending
              </Button>
              <Button
                variant={viewStatus === "done" ? "success" : "outline-success"}
                onClick={() => setViewStatus("done")}
                style={{ borderRadius: 999, fontWeight: 900 }}
              >
                Done
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Row className="g-4">
          {!isWarden ? (
            <Col lg={8}>
              <Card
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                  boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h2 className="h5 mb-0" style={{ fontWeight: 900 }}>
                      Pay Hostel Fees
                    </h2>
                    <Button
                      onClick={handlePayNow}
                      style={{
                        borderRadius: 12,
                        border: "none",
                        fontWeight: 900,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <i className="bi bi-credit-card me-2"></i>
                      Pay Now
                    </Button>
                  </div>

                  <Form>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: 800 }}>
                            Payment Type
                          </Form.Label>
                          <Form.Select
                            value={paymentType}
                            onChange={(e) => setPaymentType(e.target.value)}
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(139, 92, 246, 0.25)",
                              fontWeight: 800,
                            }}
                          >
                            <option>Monthly</option>
                            <option>Annual</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: 800 }}>
                            Months
                          </Form.Label>
                          <Form.Select
                            value={paymentType === "Annual" ? 12 : months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            disabled={paymentType === "Annual"}
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(139, 92, 246, 0.25)",
                              fontWeight: 800,
                            }}
                          >
                            {Array.from(
                              { length: 12 },
                              (_, idx) => idx + 1,
                            ).map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </Form.Select>
                          <div
                            className="text-muted mt-1"
                            style={{ fontWeight: 700, fontSize: "0.85rem" }}
                          >
                            Annual payment auto-selects 12 months.
                          </div>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: 800 }}>
                            Mode of Payment
                          </Form.Label>
                          <Form.Select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(139, 92, 246, 0.25)",
                              fontWeight: 800,
                            }}
                          >
                            <option>UPI</option>
                            <option>Debit Card</option>
                            <option>Credit Card</option>
                            <option>Net Banking</option>
                            <option>Cash</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: 800 }}>
                            Note (optional)
                          </Form.Label>
                          <Form.Control
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="e.g., Room 204 rent"
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(139, 92, 246, 0.25)",
                              fontWeight: 700,
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <div className="d-flex flex-wrap gap-2 align-items-center">
                        <Badge
                          bg=""
                          style={{
                            background: "rgba(139, 92, 246, 0.12)",
                            color: "#5b21b6",
                            border: "1px solid rgba(139, 92, 246, 0.25)",
                            padding: "0.45rem 0.75rem",
                            borderRadius: 999,
                            fontWeight: 900,
                          }}
                        >
                          Base: {formatINR(calculation.base)}
                        </Badge>
                        {calculation.discount > 0 ? (
                          <Badge
                            bg=""
                            style={{
                              background: "rgba(34, 197, 94, 0.12)",
                              color: "#15803d",
                              border: "1px solid rgba(34, 197, 94, 0.25)",
                              padding: "0.45rem 0.75rem",
                              borderRadius: 999,
                              fontWeight: 900,
                            }}
                          >
                            Discount: -{formatINR(calculation.discount)}
                          </Badge>
                        ) : null}
                        <Badge
                          bg=""
                          style={{
                            background: "rgba(245, 158, 11, 0.12)",
                            color: "#92400e",
                            border: "1px solid rgba(245, 158, 11, 0.25)",
                            padding: "0.45rem 0.75rem",
                            borderRadius: 999,
                            fontWeight: 900,
                          }}
                        >
                          Total to Pay: {formatINR(calculation.total)}
                        </Badge>
                      </div>

                      <div
                        className="text-muted mt-2"
                        style={{ fontWeight: 700 }}
                      >
                        Mode of payment:{" "}
                        <span style={{ fontWeight: 900 }}>{paymentMode}</span>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            <Col lg={8}>
              <Card
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                  boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
                }}
              >
                <Card.Body className="p-4">
                  <h2 className="h5 mb-3" style={{ fontWeight: 900 }}>
                    {viewStatus === "done"
                      ? "Done Payments"
                      : "Pending Payments"}
                  </h2>

                  {visiblePayments.length === 0 ? (
                    <div className="text-muted">
                      No {viewStatus === "done" ? "done" : "pending"} payments
                      yet.
                    </div>
                  ) : (
                    <ListGroup variant="flush">
                      {visiblePayments.map((p) => (
                        <ListGroup.Item
                          key={p.id}
                          className="d-flex align-items-start justify-content-between gap-3"
                          style={{ paddingLeft: 0, paddingRight: 0 }}
                        >
                          <div>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <div style={{ fontWeight: 900 }}>
                                {formatINR(p.total)}
                              </div>
                              <StatusPill status={p.status} />
                              <Badge
                                bg=""
                                style={{
                                  background: "rgba(99, 102, 241, 0.12)",
                                  color: "#3730a3",
                                  border: "1px solid rgba(99, 102, 241, 0.25)",
                                  padding: "0.25rem 0.55rem",
                                  borderRadius: 999,
                                  fontWeight: 900,
                                }}
                              >
                                {p.paymentType}
                              </Badge>
                            </div>
                            <div
                              className="text-muted"
                              style={{ fontWeight: 700, fontSize: "0.9rem" }}
                            >
                              {new Date(p.createdAt).toLocaleString()} •{" "}
                              {p.months} month(s) • {p.paymentMode}
                            </div>
                            {p.createdByEmail ? (
                              <div
                                className="text-muted"
                                style={{ fontWeight: 800, fontSize: "0.9rem" }}
                              >
                                Paid by: {p.createdByEmail}
                              </div>
                            ) : null}
                            {p.note ? (
                              <div
                                className="text-muted"
                                style={{ fontWeight: 700, fontSize: "0.9rem" }}
                              >
                                Note: {p.note}
                              </div>
                            ) : null}
                            {p.status === "done" && p.doneAt ? (
                              <div
                                className="text-muted"
                                style={{ fontWeight: 700, fontSize: "0.85rem" }}
                              >
                                Marked done:{" "}
                                {new Date(p.doneAt).toLocaleString()}
                                {p.doneByEmail ? ` by ${p.doneByEmail}` : ""}
                              </div>
                            ) : null}
                          </div>

                          <div className="d-flex align-items-center gap-2"></div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}

          {!isWarden ? (
            <Col lg={4}>
              <Card
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                  boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
                }}
              >
                <Card.Body className="p-4">
                  <h2 className="h6" style={{ fontWeight: 900 }}>
                    Summary
                  </h2>

                  <div className="mt-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted" style={{ fontWeight: 800 }}>
                        Type
                      </span>
                      <span style={{ fontWeight: 900 }}>{paymentType}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <span className="text-muted" style={{ fontWeight: 800 }}>
                        Months
                      </span>
                      <span style={{ fontWeight: 900 }}>
                        {calculation.months}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <span className="text-muted" style={{ fontWeight: 800 }}>
                        Mode
                      </span>
                      <span style={{ fontWeight: 900 }}>{paymentMode}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <span className="text-muted" style={{ fontWeight: 800 }}>
                        Total
                      </span>
                      <span style={{ fontWeight: 900, color: "#92400e" }}>
                        {formatINR(calculation.total)}
                      </span>
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <Button
                      onClick={handlePayNow}
                      style={{
                        borderRadius: 12,
                        border: "none",
                        fontWeight: 900,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      <i className="bi bi-lock-fill me-2"></i>
                      Confirm & Pay
                    </Button>
                  </div>

                  {lastPaymentSummary ? (
                    <div
                      className="mt-3"
                      style={{
                        borderRadius: 14,
                        border: "1px solid rgba(34, 197, 94, 0.25)",
                        background: "rgba(34, 197, 94, 0.08)",
                        padding: "0.9rem",
                      }}
                    >
                      <div style={{ fontWeight: 900, color: "#166534" }}>
                        Payment Created (Pending)
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        {formatINR(lastPaymentSummary.total)} via{" "}
                        {lastPaymentSummary.paymentMode}
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontWeight: 700, fontSize: "0.85rem" }}
                      >
                        {new Date(lastPaymentSummary.paidAt).toLocaleString()}
                      </div>
                    </div>
                  ) : null}
                </Card.Body>
              </Card>
            </Col>
          ) : null}
        </Row>

        {!isWarden ? (
          <Card
            className="mt-4"
            style={{
              borderRadius: 18,
              border: "1px solid rgba(139, 92, 246, 0.15)",
              boxShadow: "0 8px 30px rgba(102, 126, 234, 0.08)",
            }}
          >
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h5 mb-0" style={{ fontWeight: 900 }}>
                  {viewStatus === "done" ? "Done" : "Pending"} Payments
                </h2>
                <span className="text-muted" style={{ fontWeight: 700 }}>
                  Latest first
                </span>
              </div>

              {visiblePayments.length === 0 ? (
                <div className="text-muted">No payments found.</div>
              ) : (
                <ListGroup variant="flush">
                  {visiblePayments.map((p) => (
                    <ListGroup.Item
                      key={p.id}
                      className="d-flex align-items-start justify-content-between gap-3"
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      <div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <div style={{ fontWeight: 900 }}>
                            {formatINR(p.total)}
                          </div>
                          <StatusPill status={p.status} />
                          <Badge
                            bg=""
                            style={{
                              background: "rgba(99, 102, 241, 0.12)",
                              color: "#3730a3",
                              border: "1px solid rgba(99, 102, 241, 0.25)",
                              padding: "0.25rem 0.55rem",
                              borderRadius: 999,
                              fontWeight: 900,
                            }}
                          >
                            {p.paymentType}
                          </Badge>
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontWeight: 700, fontSize: "0.9rem" }}
                        >
                          {new Date(p.createdAt).toLocaleString()} • {p.months}{" "}
                          month(s) • {p.paymentMode}
                        </div>
                        {p.note ? (
                          <div
                            className="text-muted"
                            style={{ fontWeight: 700, fontSize: "0.9rem" }}
                          >
                            Note: {p.note}
                          </div>
                        ) : null}
                      </div>

                      <div className="d-flex align-items-center gap-2"></div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        ) : null}
      </Container>
    </div>
  );
};

export default Payments;
