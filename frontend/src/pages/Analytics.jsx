import React, { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import { useComplaints } from "../context/ComplaintsContext";
import { useAuth } from "../context/AuthContext";

const Analytics = () => {
  const { complaints, stats, setComplaintResolved } = useComplaints();
  const { userRole } = useAuth();
  const isWarden = userRole === "warden";
  const [typeFilter, setTypeFilter] = useState("All");

  const types = useMemo(() => {
    const set = new Set();
    complaints.forEach((c) => set.add(c.type || "Other"));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    const sorted = [...complaints].sort((a, b) => b.createdAt - a.createdAt);
    if (typeFilter === "All") return sorted;
    return sorted.filter((c) => (c.type || "Other") === typeFilter);
  }, [complaints, typeFilter]);

  const byType = useMemo(() => {
    const map = new Map();
    complaints.forEach((c) => {
      const type = c.type || "Other";
      if (!map.has(type))
        map.set(type, { type, total: 0, resolved: 0, unresolved: 0 });
      const entry = map.get(type);
      entry.total += 1;
      if (c.isResolved) entry.resolved += 1;
      else entry.unresolved += 1;
    });
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [complaints]);

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
              Analytics
            </h1>
            <div className="text-muted">
              Complaints analysis: type, status, and overall resolution
              performance.
            </div>
          </div>
          <Badge
            bg=""
            style={{
              background: "rgba(245, 158, 11, 0.12)",
              color: "#92400e",
              border: "1px solid rgba(245, 158, 11, 0.25)",
              padding: "0.6rem 0.9rem",
              borderRadius: 999,
              fontWeight: 800,
            }}
          >
            <i className="bi bi-graph-up-arrow me-2"></i>
            Resolution: {stats.resolvedRate}%
          </Badge>
        </div>

        <Row className="g-4">
          <Col lg={6}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid rgba(139, 92, 246, 0.15)",
                boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
              }}
            >
              <Card.Body className="p-4">
                <h2 className="h5" style={{ fontWeight: 900 }}>
                  Overall Performance
                </h2>
                <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
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
                    Total: {stats.total}
                  </Badge>
                  <Badge
                    bg="success"
                    style={{
                      padding: "0.45rem 0.75rem",
                      borderRadius: 999,
                      fontWeight: 900,
                    }}
                  >
                    Resolved: {stats.resolved}
                  </Badge>
                  <Badge
                    bg="secondary"
                    style={{
                      padding: "0.45rem 0.75rem",
                      borderRadius: 999,
                      fontWeight: 900,
                    }}
                  >
                    Unresolved: {stats.unresolved}
                  </Badge>
                </div>

                <div className="mt-3" style={{ fontWeight: 800 }}>
                  Resolution Rate
                </div>
                <ProgressBar
                  now={stats.resolvedRate}
                  label={`${stats.resolvedRate}%`}
                  style={{ height: 16, borderRadius: 999 }}
                  className="mt-2"
                />

                <div className="text-muted mt-3" style={{ fontWeight: 700 }}>
                  Performance is calculated as: resolved / total × 100.
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid rgba(139, 92, 246, 0.15)",
                boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
              }}
            >
              <Card.Body className="p-4">
                <h2 className="h5" style={{ fontWeight: 900 }}>
                  By Complaint Type
                </h2>
                {byType.length === 0 ? (
                  <div className="text-muted">No complaints yet.</div>
                ) : (
                  <Table responsive borderless className="mt-3 mb-0">
                    <thead>
                      <tr
                        className="text-muted"
                        style={{ fontWeight: 800, fontSize: "0.9rem" }}
                      >
                        <th>Type</th>
                        <th>Total</th>
                        <th>Resolved</th>
                        <th>Unresolved</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byType.map((row) => (
                        <tr key={row.type}>
                          <td style={{ fontWeight: 900 }}>{row.type}</td>
                          <td style={{ fontWeight: 800 }}>{row.total}</td>
                          <td style={{ fontWeight: 800, color: "#16a34a" }}>
                            {row.resolved}
                          </td>
                          <td style={{ fontWeight: 800, color: "#6b7280" }}>
                            {row.unresolved}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid rgba(139, 92, 246, 0.15)",
                boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                  <h2 className="h5 mb-0" style={{ fontWeight: 900 }}>
                    Complaints Status
                  </h2>
                  <div className="d-flex align-items-center gap-2">
                    <Form.Label
                      className="mb-0 text-muted"
                      style={{ fontWeight: 800 }}
                    >
                      Filter
                    </Form.Label>
                    <Form.Select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      style={{
                        width: 220,
                        borderRadius: 12,
                        border: "1px solid rgba(139, 92, 246, 0.25)",
                        fontWeight: 800,
                      }}
                    >
                      {types.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div>

                {filteredComplaints.length === 0 ? (
                  <div className="text-muted">
                    No complaints for this filter.
                  </div>
                ) : (
                  <ListGroup variant="flush">
                    {filteredComplaints.map((c) => (
                      <ListGroup.Item
                        key={c.id}
                        className="d-flex align-items-start justify-content-between gap-3"
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                      >
                        <div>
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <div style={{ fontWeight: 900 }}>{c.text}</div>
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
                              {c.type || "Other"}
                            </Badge>
                          </div>
                          <div
                            className="text-muted"
                            style={{ fontWeight: 700, fontSize: "0.9rem" }}
                          >
                            {new Date(c.createdAt).toLocaleString()}
                          </div>
                          {isWarden && c.createdByEmail ? (
                            <div
                              className="text-muted"
                              style={{ fontWeight: 800, fontSize: "0.9rem" }}
                            >
                              Filed by: {c.createdByEmail}
                            </div>
                          ) : null}
                        </div>

                        <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
                          <Badge
                            bg={c.isResolved ? "success" : "secondary"}
                            style={{
                              borderRadius: 999,
                              padding: "0.45rem 0.7rem",
                              fontWeight: 900,
                            }}
                          >
                            {c.isResolved ? "Resolved" : "Unresolved"}
                          </Badge>

                          {isWarden ? (
                            <Button
                              size="sm"
                              variant={
                                c.isResolved
                                  ? "outline-secondary"
                                  : "outline-success"
                              }
                              style={{ borderRadius: 12, fontWeight: 900 }}
                              onClick={() =>
                                setComplaintResolved(c.id, !c.isResolved)
                              }
                            >
                              {c.isResolved
                                ? "Mark Unresolved"
                                : "Mark Resolved"}
                            </Button>
                          ) : null}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}

                {!isWarden ? (
                  <div className="text-muted mt-3" style={{ fontWeight: 700 }}>
                    Note: Only warden accounts can change resolved status.
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Analytics;
