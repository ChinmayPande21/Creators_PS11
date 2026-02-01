import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useComplaints } from "../context/ComplaintsContext";
import { useAuth } from "../context/AuthContext";

const Complaints = () => {
  const navigate = useNavigate();
  const {
    complaints,
    stats,
    addComplaint,
    setComplaintRead,
    setComplaintResolved,
    setComplaintWardenComment,
  } = useComplaints();
  const { userRole, userEmail } = useAuth();
  const isWarden = userRole === "warden";
  const [text, setText] = useState("");
  const [type, setType] = useState("Other");
  const [error, setError] = useState("");
  const [draftComments, setDraftComments] = useState({});

  const sortedComplaints = useMemo(() => {
    return [...complaints].sort((a, b) => b.createdAt - a.createdAt);
  }, [complaints]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = addComplaint(text, type);
    if (!id) {
      setError("Please enter your complaint.");
      return;
    }
    setError("");
    setText("");
  };

  const handleMarkReadAndGo = (id) => {
    setComplaintRead(id, true, userEmail);
    navigate("/dashboard", { replace: true });
  };

  const handleWardenMarkRead = (id, nextRead) => {
    setComplaintRead(id, nextRead, userEmail);
  };

  const handleWardenResolve = (id, nextResolved) => {
    setComplaintResolved(id, nextResolved);
  };

  const handleWardenSaveComment = (id) => {
    const comment = draftComments[id] ?? "";
    setComplaintWardenComment(id, comment, userEmail);
  };

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
        <div className="mb-4">
          <h1
            className="mb-1"
            style={{ fontWeight: 900, letterSpacing: "-0.5px" }}
          >
            Complaints
          </h1>
          <div className="text-muted">
            {isWarden
              ? "Warden inbox: view and track all complaints."
              : "Student: submit issues and track your complaints."}
          </div>
        </div>

        <Row className="g-4">
          <Col lg={7}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid rgba(139, 92, 246, 0.15)",
                boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                  <h2 className="h5 mb-0" style={{ fontWeight: 900 }}>
                    {isWarden ? "Warden Actions" : "Create Complaint"}
                  </h2>
                  <Badge
                    bg=""
                    style={{
                      background: "rgba(139, 92, 246, 0.12)",
                      color: "#5b21b6",
                      border: "1px solid rgba(139, 92, 246, 0.25)",
                      padding: "0.45rem 0.75rem",
                      borderRadius: 999,
                      fontWeight: 800,
                    }}
                  >
                    Unread: {stats.unread}
                  </Badge>
                </div>

                {isWarden ? (
                  <div className="text-muted" style={{ fontWeight: 700 }}>
                    Select a complaint from the inbox and mark it as
                    read/resolved, then add a resolution comment.
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 800 }}>
                        Complaint Type
                      </Form.Label>
                      <Form.Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{
                          borderRadius: 14,
                          border: "1px solid rgba(139, 92, 246, 0.25)",
                        }}
                      >
                        <option>Maintenance</option>
                        <option>Cleanliness</option>
                        <option>Food</option>
                        <option>Security</option>
                        <option>Ragging</option>
                        <option>Payment</option>
                        <option>Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 800 }}>
                        Complaint
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your complaint here..."
                        style={{
                          borderRadius: 14,
                          border: "1px solid rgba(139, 92, 246, 0.25)",
                        }}
                      />
                      {error ? (
                        <div
                          className="text-danger mt-2"
                          style={{ fontWeight: 700 }}
                        >
                          {error}
                        </div>
                      ) : null}
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        style={{
                          borderRadius: 12,
                          border: "none",
                          fontWeight: 900,
                          padding: "0.7rem 1.1rem",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        <i className="bi bi-send me-2"></i>
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card
              style={{
                borderRadius: 18,
                border: "1px solid rgba(139, 92, 246, 0.15)",
                boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h2 className="h6 mb-0" style={{ fontWeight: 900 }}>
                    Complaints Checklist
                  </h2>
                  <span
                    className="text-muted"
                    style={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    Total: {stats.total}
                  </span>
                </div>

                {sortedComplaints.length === 0 ? (
                  <div className="text-muted">No complaints yet.</div>
                ) : (
                  <ListGroup variant="flush">
                    {sortedComplaints.map((c) => (
                      <ListGroup.Item
                        key={c.id}
                        className="d-flex align-items-start justify-content-between gap-3"
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
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
                            style={{ fontWeight: 700, fontSize: "0.85rem" }}
                          >
                            {new Date(c.createdAt).toLocaleString()}
                          </div>

                          {isWarden && c.createdByEmail ? (
                            <div
                              className="text-muted"
                              style={{ fontWeight: 800, fontSize: "0.85rem" }}
                            >
                              Filed by: {c.createdByEmail}
                            </div>
                          ) : null}

                          {!isWarden && c.wardenComment ? (
                            <div
                              className="mt-2"
                              style={{
                                borderRadius: 12,
                                border: "1px solid rgba(34, 197, 94, 0.25)",
                                background: "rgba(34, 197, 94, 0.08)",
                                padding: "0.75rem",
                              }}
                            >
                              <div
                                style={{ fontWeight: 900, color: "#166534" }}
                              >
                                Warden Comment
                              </div>
                              <div
                                className="text-muted"
                                style={{ fontWeight: 700 }}
                              >
                                {c.wardenComment}
                              </div>
                            </div>
                          ) : null}

                          {isWarden ? (
                            <div className="mt-3">
                              <Form.Check
                                type="switch"
                                id={`read-${c.id}`}
                                label={
                                  <span style={{ fontWeight: 900 }}>
                                    Mark as Read
                                  </span>
                                }
                                checked={Boolean(c.isRead)}
                                onChange={(e) =>
                                  handleWardenMarkRead(c.id, e.target.checked)
                                }
                              />
                              <Form.Check
                                type="switch"
                                id={`resolved-${c.id}`}
                                className="mt-2"
                                label={
                                  <span style={{ fontWeight: 900 }}>
                                    Mark as Resolved
                                  </span>
                                }
                                checked={Boolean(c.isResolved)}
                                onChange={(e) =>
                                  handleWardenResolve(c.id, e.target.checked)
                                }
                              />

                              <Form.Group className="mt-3">
                                <Form.Label style={{ fontWeight: 900 }}>
                                  Resolution Comment
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={2}
                                  value={
                                    draftComments[c.id] ?? c.wardenComment ?? ""
                                  }
                                  onChange={(e) =>
                                    setDraftComments((prev) => ({
                                      ...prev,
                                      [c.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Write how you solved this complaint..."
                                  style={{
                                    borderRadius: 12,
                                    border:
                                      "1px solid rgba(139, 92, 246, 0.25)",
                                  }}
                                />
                              </Form.Group>

                              <div className="d-flex gap-2 flex-wrap mt-2">
                                <Button
                                  size="sm"
                                  style={{
                                    borderRadius: 12,
                                    border: "none",
                                    fontWeight: 900,
                                    background:
                                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  }}
                                  onClick={() => handleWardenSaveComment(c.id)}
                                >
                                  Save Comment
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  style={{ borderRadius: 12, fontWeight: 900 }}
                                  onClick={() => {
                                    setDraftComments((prev) => {
                                      const next = { ...prev };
                                      delete next[c.id];
                                      return next;
                                    });
                                  }}
                                >
                                  Reset Draft
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <div
                          className="d-flex flex-column align-items-end gap-2"
                          style={{ minWidth: 120 }}
                        >
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
                          <Badge
                            bg={c.isRead ? "success" : "warning"}
                            text={c.isRead ? "light" : "dark"}
                            style={{
                              borderRadius: 999,
                              padding: "0.45rem 0.7rem",
                              fontWeight: 900,
                            }}
                          >
                            {c.isRead ? "Read" : "Unread"}
                          </Badge>

                          {!isWarden ? (
                            <Button
                              size="sm"
                              variant="outline-primary"
                              style={{ borderRadius: 12, fontWeight: 900 }}
                              onClick={() => handleMarkReadAndGo(c.id)}
                              disabled={!c.isResolved}
                              title={
                                c.isResolved
                                  ? "Acknowledge and go to Dashboard"
                                  : "Warden must resolve first"
                              }
                            >
                              Acknowledge
                            </Button>
                          ) : null}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}

                <div
                  className="text-muted mt-3"
                  style={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  {isWarden
                    ? "Warden: update read/resolved and leave a comment to solve the complaint."
                    : "Student: once warden resolves, click Acknowledge to mark it read and go to Dashboard."}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Complaints;
