import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Container,
  Form,
  ListGroup,
} from "react-bootstrap";
import { useComplaints } from "../context/ComplaintsContext";
import { useAuth } from "../context/AuthContext";
import { usePayments } from "../context/PaymentsContext";
import { useRaggingAlerts } from "../context/RaggingAlertsContext";

const AlertStatusPill = ({ status }) => {
  const acknowledged = status === "acknowledged";
  return (
    <Badge
      bg={acknowledged ? "success" : "danger"}
      style={{
        borderRadius: 999,
        padding: "0.45rem 0.7rem",
        fontWeight: 900,
      }}
    >
      {acknowledged ? "Acknowledged" : "Emergency"}
    </Badge>
  );
};

const normalizeRoomLocation = (value) => {
  const v = String(value || "").trim();
  if (!v) return "";

  if (/^\d{1,5}$/.test(v)) return `Room ${v}`;

  const roomMatch = v.match(/^room\s*#?\s*(\d{1,5})$/i);
  if (roomMatch) return `Room ${roomMatch[1]}`;

  return v;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { complaints, stats } = useComplaints();
  const { stats: paymentStats } = usePayments();
  const {
    alerts,
    stats: alertStats,
    createAlert,
    acknowledgeAlert,
    addComment,
  } = useRaggingAlerts();
  const { userRole, userEmail } = useAuth();
  const isWarden = userRole === "warden";

  const [alertLocation, setAlertLocation] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertRaggingType, setAlertRaggingType] = useState("Physical ragging");
  const [alertIntensity, setAlertIntensity] = useState("High");
  const [alertPhotoDataUrl, setAlertPhotoDataUrl] = useState("");
  const [alertPhotoError, setAlertPhotoError] = useState("");
  const [wardenAckNoteById, setWardenAckNoteById] = useState({});
  const [wardenAckPhotoById, setWardenAckPhotoById] = useState({});
  const [wardenAckPhotoErrorById, setWardenAckPhotoErrorById] = useState({});
  const [commentDraftById, setCommentDraftById] = useState({});

  const visibleAlerts = useMemo(() => {
    return [...alerts].sort((a, b) => b.createdAt - a.createdAt);
  }, [alerts]);

  const submitAlert = async () => {
    const id = await createAlert({
      location: normalizeRoomLocation(alertLocation),
      message: alertMessage,
      raggingType: alertRaggingType,
      intensity: alertIntensity,
      photoDataUrl: alertPhotoDataUrl,
    });
    if (!id) return;
    setAlertLocation("");
    setAlertMessage("");
    setAlertRaggingType("Physical ragging");
    setAlertIntensity("High");
    setAlertPhotoDataUrl("");
    setAlertPhotoError("");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAlertPhotoDataUrl("");
      setAlertPhotoError("");
      return;
    }

    const maxBytes = 700 * 1024; // localStorage-friendly cap (~700KB)
    if (file.size > maxBytes) {
      setAlertPhotoDataUrl("");
      setAlertPhotoError(
        "Photo is too large. Please use an image under 700KB.",
      );
      return;
    }

    if (!file.type?.startsWith("image/")) {
      setAlertPhotoDataUrl("");
      setAlertPhotoError("Only image files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setAlertPhotoDataUrl(result);
      setAlertPhotoError("");
    };
    reader.onerror = () => {
      setAlertPhotoDataUrl("");
      setAlertPhotoError("Failed to read the image. Try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleWardenProofChange = (alertId, e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setWardenAckPhotoById((prev) => ({ ...prev, [alertId]: "" }));
      setWardenAckPhotoErrorById((prev) => ({ ...prev, [alertId]: "" }));
      return;
    }

    const maxBytes = 700 * 1024;
    if (file.size > maxBytes) {
      setWardenAckPhotoById((prev) => ({ ...prev, [alertId]: "" }));
      setWardenAckPhotoErrorById((prev) => ({
        ...prev,
        [alertId]: "Photo is too large. Please use an image under 700KB.",
      }));
      return;
    }

    if (!file.type?.startsWith("image/")) {
      setWardenAckPhotoById((prev) => ({ ...prev, [alertId]: "" }));
      setWardenAckPhotoErrorById((prev) => ({
        ...prev,
        [alertId]: "Only image files are allowed.",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setWardenAckPhotoById((prev) => ({ ...prev, [alertId]: result }));
      setWardenAckPhotoErrorById((prev) => ({ ...prev, [alertId]: "" }));
    };
    reader.onerror = () => {
      setWardenAckPhotoById((prev) => ({ ...prev, [alertId]: "" }));
      setWardenAckPhotoErrorById((prev) => ({
        ...prev,
        [alertId]: "Failed to read the image. Try again.",
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #f3f4f6 0%, #ffffff 70%)",
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
              Dashboard
            </h1>
            <div className="text-muted">
              {isWarden
                ? "All students' complaints are visible here."
                : "Your complaints are visible here."}
            </div>
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
              Total: {stats.total}
            </Badge>
            <Badge
              bg="warning"
              text="dark"
              style={{
                padding: "0.6rem 0.9rem",
                borderRadius: 999,
                fontWeight: 900,
              }}
            >
              Unread: {stats.unread}
            </Badge>
            <Badge
              bg="success"
              style={{
                padding: "0.6rem 0.9rem",
                borderRadius: 999,
                fontWeight: 900,
              }}
            >
              Read: {stats.read}
            </Badge>
            <Button
              onClick={() => navigate("/complaints")}
              style={{
                borderRadius: 12,
                border: "none",
                fontWeight: 900,
                padding: "0.7rem 1.1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Complaint
            </Button>
          </div>
        </div>

        <Card
          className="mb-4"
          style={{
            borderRadius: 18,
            border: "1px solid rgba(139, 92, 246, 0.15)",
            boxShadow: "0 8px 30px rgba(102, 126, 234, 0.10)",
          }}
        >
          <Card.Body className="p-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <h2 className="h5 mb-1" style={{ fontWeight: 900 }}>
                  Payments
                </h2>
                <div className="text-muted" style={{ fontWeight: 700 }}>
                  {isWarden
                    ? "See student payments and mark them done."
                    : "Track your pending and done payments."}
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2">
                <Badge
                  bg="warning"
                  text="dark"
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius: 999,
                    fontWeight: 900,
                  }}
                >
                  Pending: {paymentStats.pending}
                </Badge>
                <Badge
                  bg="success"
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius: 999,
                    fontWeight: 900,
                  }}
                >
                  Done: {paymentStats.done}
                </Badge>
                <Button
                  onClick={() => navigate("/payments")}
                  style={{
                    borderRadius: 12,
                    border: "none",
                    fontWeight: 900,
                    padding: "0.7rem 1.1rem",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <i className="bi bi-credit-card me-2"></i>
                  Open Payments
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card
          className="mb-4"
          style={{
            borderRadius: 18,
            border: "1px solid rgba(239, 68, 68, 0.20)",
            boxShadow: "0 8px 30px rgba(239, 68, 68, 0.08)",
          }}
        >
          <Card.Body className="p-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
              <div>
                <h2 className="h5 mb-1" style={{ fontWeight: 900 }}>
                  Ragging Alerts
                </h2>
                <div className="text-muted" style={{ fontWeight: 700 }}>
                  {isWarden
                    ? "Emergency alerts sent by students (location + time)."
                    : "Send an emergency alert to the warden with your location (e.g., Room 303)."}
                </div>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2">
                <Badge
                  bg="danger"
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius: 999,
                    fontWeight: 900,
                  }}
                >
                  Emergency: {alertStats.pending}
                </Badge>
                <Badge
                  bg="success"
                  style={{
                    padding: "0.6rem 0.9rem",
                    borderRadius: 999,
                    fontWeight: 900,
                  }}
                >
                  Acknowledged: {alertStats.acknowledged}
                </Badge>
              </div>
            </div>

            {!isWarden ? (
              <div
                style={{
                  borderRadius: 14,
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  background: "rgba(239, 68, 68, 0.06)",
                  padding: "1rem",
                }}
              >
                <div
                  className="mb-3"
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    background: "rgba(239, 68, 68, 0.10)",
                    padding: "0.85rem",
                  }}
                >
                  <div style={{ fontWeight: 900, color: "#991b1b" }}>
                    Warning
                  </div>
                  <div style={{ fontWeight: 700, color: "#7f1d1d" }}>
                    In case of fake allegations of ragging, strict actions will
                    be taken.
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <Form.Group style={{ minWidth: 220, flex: "1 1 220px" }}>
                    <Form.Label style={{ fontWeight: 900 }}>Room No</Form.Label>
                    <Form.Control
                      value={alertLocation}
                      onChange={(e) => setAlertLocation(e.target.value)}
                      placeholder="e.g., 303"
                      style={{ borderRadius: 12, fontWeight: 800 }}
                    />
                  </Form.Group>

                  <Form.Group style={{ minWidth: 240, flex: "1 1 240px" }}>
                    <Form.Label style={{ fontWeight: 900 }}>
                      Type of Ragging
                    </Form.Label>
                    <Form.Select
                      value={alertRaggingType}
                      onChange={(e) => setAlertRaggingType(e.target.value)}
                      style={{ borderRadius: 12, fontWeight: 800 }}
                    >
                      <option>Physical ragging</option>
                      <option>Verbal ragging</option>
                      <option>Psychological / emotional ragging</option>
                      <option>Sexual ragging</option>
                      <option>Economic ragging</option>
                      <option>Cyber ragging</option>
                      <option>Institutional ragging</option>
                      <option>Discriminatory ragging</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group style={{ minWidth: 200, flex: "1 1 200px" }}>
                    <Form.Label style={{ fontWeight: 900 }}>
                      Intensity
                    </Form.Label>
                    <Form.Select
                      value={alertIntensity}
                      onChange={(e) => setAlertIntensity(e.target.value)}
                      style={{ borderRadius: 12, fontWeight: 800 }}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Severe</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group style={{ minWidth: 260, flex: "2 1 260px" }}>
                    <Form.Label style={{ fontWeight: 900 }}>
                      What is happening?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                      placeholder="Describe the ragging/emergency briefly…"
                      style={{ borderRadius: 12, fontWeight: 700 }}
                    />
                  </Form.Group>

                  <Form.Group style={{ minWidth: 220, flex: "1 1 220px" }}>
                    <Form.Label style={{ fontWeight: 900 }}>
                      Photo Proof (optional)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      style={{ borderRadius: 12, fontWeight: 700 }}
                    />
                    {alertPhotoError ? (
                      <div
                        className="text-danger mt-1"
                        style={{ fontWeight: 700, fontSize: "0.85rem" }}
                      >
                        {alertPhotoError}
                      </div>
                    ) : null}
                    {alertPhotoDataUrl ? (
                      <div className="mt-2">
                        <img
                          src={alertPhotoDataUrl}
                          alt="Selected proof"
                          style={{
                            width: "100%",
                            maxWidth: 220,
                            borderRadius: 12,
                            border: "1px solid rgba(239, 68, 68, 0.25)",
                          }}
                        />
                      </div>
                    ) : null}
                  </Form.Group>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <Button
                    onClick={submitAlert}
                    variant="danger"
                    style={{ borderRadius: 12, fontWeight: 900 }}
                  >
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Send Alert
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="mt-3">
              {visibleAlerts.length === 0 ? (
                <div className="text-muted">No ragging alerts yet.</div>
              ) : (
                <ListGroup variant="flush">
                  {visibleAlerts.map((a) => (
                    <ListGroup.Item
                      key={a.id}
                      className="d-flex align-items-start justify-content-between gap-3"
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                    >
                      <div style={{ flex: 1 }}>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <div style={{ fontWeight: 900 }}>
                            <i className="bi bi-geo-alt me-1"></i>
                            {normalizeRoomLocation(a.location) || "Unknown"}
                          </div>
                          <AlertStatusPill status={a.status} />
                          {a.raggingType ? (
                            <Badge
                              bg=""
                              style={{
                                background: "rgba(99, 102, 241, 0.12)",
                                color: "#3730a3",
                                border: "1px solid rgba(99, 102, 241, 0.25)",
                                borderRadius: 999,
                                padding: "0.4rem 0.65rem",
                                fontWeight: 900,
                              }}
                            >
                              {a.raggingType}
                            </Badge>
                          ) : null}
                          {a.intensity ? (
                            <Badge
                              bg={
                                a.intensity === "Severe"
                                  ? "danger"
                                  : a.intensity === "High"
                                    ? "warning"
                                    : "secondary"
                              }
                              text={a.intensity === "High" ? "dark" : undefined}
                              style={{
                                borderRadius: 999,
                                padding: "0.4rem 0.65rem",
                                fontWeight: 900,
                              }}
                            >
                              Intensity: {a.intensity}
                            </Badge>
                          ) : null}
                          <div
                            className="text-muted"
                            style={{ fontWeight: 800, fontSize: "0.9rem" }}
                          >
                            <i className="bi bi-clock me-1"></i>
                            {new Date(a.createdAt).toLocaleString()}
                          </div>
                        </div>
                        <div style={{ fontWeight: 800 }} className="mt-1">
                          {a.message}
                        </div>

                        {a.photoDataUrl ? (
                          <div className="mt-2">
                            <a
                              href={a.photoDataUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-decoration-none"
                              style={{ fontWeight: 900 }}
                            >
                              View Photo Proof
                            </a>
                            <div className="mt-2">
                              <img
                                src={a.photoDataUrl}
                                alt="Ragging proof"
                                style={{
                                  width: "100%",
                                  maxWidth: 260,
                                  borderRadius: 12,
                                  border: "1px solid rgba(239, 68, 68, 0.25)",
                                }}
                              />
                            </div>
                          </div>
                        ) : null}
                        {isWarden && a.createdByEmail ? (
                          <div
                            className="text-muted"
                            style={{ fontWeight: 800, fontSize: "0.9rem" }}
                          >
                            Sent by: {a.createdByEmail}
                          </div>
                        ) : null}
                        {!isWarden && a.status === "acknowledged" ? (
                          <div
                            className="mt-2"
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(34, 197, 94, 0.25)",
                              background: "rgba(34, 197, 94, 0.08)",
                              padding: "0.75rem",
                            }}
                          >
                            <div style={{ fontWeight: 900, color: "#166534" }}>
                              Warden Acknowledged
                            </div>
                            {a.wardenNote ? (
                              <div
                                className="text-muted"
                                style={{ fontWeight: 700 }}
                              >
                                {a.wardenNote}
                              </div>
                            ) : (
                              <div
                                className="text-muted"
                                style={{ fontWeight: 700 }}
                              >
                                Your alert has been acknowledged.
                              </div>
                            )}

                            {a.wardenPhotoDataUrl ? (
                              <div className="mt-2">
                                <div
                                  style={{ fontWeight: 900, color: "#166534" }}
                                >
                                  Warden Proof
                                </div>
                                <a
                                  href={a.wardenPhotoDataUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-decoration-none"
                                  style={{ fontWeight: 900 }}
                                >
                                  View Proof Image
                                </a>
                                <div className="mt-2">
                                  <img
                                    src={a.wardenPhotoDataUrl}
                                    alt="Warden proof"
                                    style={{
                                      width: "100%",
                                      maxWidth: 260,
                                      borderRadius: 12,
                                      border:
                                        "1px solid rgba(34, 197, 94, 0.25)",
                                    }}
                                  />
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {Array.isArray(a.comments) && a.comments.length > 0 ? (
                          <div
                            className="mt-2"
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(99, 102, 241, 0.18)",
                              background: "rgba(99, 102, 241, 0.06)",
                              padding: "0.75rem",
                            }}
                          >
                            <div style={{ fontWeight: 900 }}>Comments</div>
                            <div className="mt-2 d-flex flex-column gap-2">
                              {a.comments.map((c) => (
                                <div key={c.id}>
                                  <div style={{ fontWeight: 800 }}>
                                    {c.text}
                                  </div>
                                  <div
                                    className="text-muted"
                                    style={{
                                      fontWeight: 700,
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    {new Date(c.createdAt).toLocaleString()}
                                    {c.createdByEmail
                                      ? ` • ${c.createdByEmail}`
                                      : ""}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {!isWarden ? (
                          <div className="mt-3 d-flex flex-wrap gap-2">
                            <Form.Control
                              value={commentDraftById[a.id] || ""}
                              onChange={(e) =>
                                setCommentDraftById((prev) => ({
                                  ...prev,
                                  [a.id]: e.target.value,
                                }))
                              }
                              placeholder="Quick comment (e.g., Need warden now in Room 303)"
                              style={{
                                borderRadius: 12,
                                fontWeight: 700,
                                minWidth: 260,
                                flex: "1 1 260px",
                              }}
                            />
                            <Button
                              variant="primary"
                              onClick={() => {
                                addComment(a.id, commentDraftById[a.id] || "");
                                setCommentDraftById((prev) => ({
                                  ...prev,
                                  [a.id]: "",
                                }));
                              }}
                              style={{ borderRadius: 12, fontWeight: 900 }}
                            >
                              <i className="bi bi-chat-left-text me-2"></i>
                              Add Comment
                            </Button>
                          </div>
                        ) : null}
                      </div>

                      {isWarden ? (
                        <div style={{ minWidth: 260 }}>
                          {a.status !== "acknowledged" ? (
                            <>
                              <Form.Control
                                value={wardenAckNoteById[a.id] || ""}
                                onChange={(e) =>
                                  setWardenAckNoteById((prev) => ({
                                    ...prev,
                                    [a.id]: e.target.value,
                                  }))
                                }
                                placeholder="Optional note (e.g., On my way)"
                                style={{ borderRadius: 12, fontWeight: 700 }}
                              />

                              <div className="mt-2">
                                <Form.Label style={{ fontWeight: 900 }}>
                                  Proof Image (optional)
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleWardenProofChange(a.id, e)
                                  }
                                  style={{ borderRadius: 12, fontWeight: 700 }}
                                />
                                {wardenAckPhotoErrorById[a.id] ? (
                                  <div
                                    className="text-danger mt-1"
                                    style={{
                                      fontWeight: 700,
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    {wardenAckPhotoErrorById[a.id]}
                                  </div>
                                ) : null}
                                {wardenAckPhotoById[a.id] ? (
                                  <div className="mt-2">
                                    <img
                                      src={wardenAckPhotoById[a.id]}
                                      alt="Selected proof"
                                      style={{
                                        width: "100%",
                                        maxWidth: 220,
                                        borderRadius: 12,
                                        border:
                                          "1px solid rgba(34, 197, 94, 0.25)",
                                      }}
                                    />
                                  </div>
                                ) : null}
                              </div>

                              <div className="d-flex justify-content-end mt-2">
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={() => {
                                    acknowledgeAlert(a.id, {
                                      byEmail: userEmail,
                                      wardenNote: wardenAckNoteById[a.id] || "",
                                      wardenPhotoDataUrl:
                                        wardenAckPhotoById[a.id] || "",
                                    });
                                    setWardenAckNoteById((prev) => ({
                                      ...prev,
                                      [a.id]: "",
                                    }));
                                    setWardenAckPhotoById((prev) => ({
                                      ...prev,
                                      [a.id]: "",
                                    }));
                                    setWardenAckPhotoErrorById((prev) => ({
                                      ...prev,
                                      [a.id]: "",
                                    }));
                                  }}
                                  style={{ borderRadius: 12, fontWeight: 900 }}
                                >
                                  <i className="bi bi-check2-circle me-1"></i>
                                  Acknowledge
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div
                              className="text-muted"
                              style={{ fontWeight: 700 }}
                            >
                              Acknowledged
                            </div>
                          )}
                        </div>
                      ) : null}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
          </Card.Body>
        </Card>

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
                Complaints
              </h2>
              <span className="text-muted" style={{ fontWeight: 700 }}>
                Latest first
              </span>
            </div>

            {complaints.length === 0 ? (
              <div className="text-muted">No complaints submitted yet.</div>
            ) : (
              <ListGroup variant="flush">
                {[...complaints]
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((c) => (
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

                        {c.wardenComment ? (
                          <div
                            className="mt-2"
                            style={{
                              borderRadius: 12,
                              border: "1px solid rgba(34, 197, 94, 0.25)",
                              background: "rgba(34, 197, 94, 0.08)",
                              padding: "0.75rem",
                            }}
                          >
                            <div style={{ fontWeight: 900, color: "#166534" }}>
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
                      </div>

                      <div className="d-flex align-items-center gap-2">
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
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;
