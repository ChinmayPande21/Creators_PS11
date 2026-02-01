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

const HOSTELS_BY_AREA = [
  {
    area: "Wanadongri",
    hostels: [
      "Galaxy Boys Hostel",
      "Rainbow Boys Hostel",
      "Arya Girls Hostel",
      "Dr. Babasaheb Ambedkar Government Boys Hostel",
      "Samaj Kalyan Government Girls Hostel",
    ],
  },
  {
    area: "Sitabuldi",
    hostels: [
      "Government Boys Hostel Sitabuldi",
      "Government Girls Hostel Sitabuldi",
      "Shree Ganesh Boys Hostel",
    ],
  },
  {
    area: "Gokulpeth / Shivaji Nagar",
    hostels: [
      "Saraswati Girls Hostel",
      "Sharda Girls Hostel",
      "Sai Boys Hostel",
    ],
  },
  {
    area: "Pratap Nagar / Trimurti Nagar",
    hostels: ["New Era Boys Hostel", "Shree Sai Girls Hostel"],
  },
  {
    area: "Hingna Road",
    hostels: [
      "YCCE Boys Hostel",
      "Shree Balaji Boys Hostel",
      "Om Sai Girls Hostel",
    ],
  },
];

const Hostels = () => {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("");

  const areaOptions = useMemo(() => HOSTELS_BY_AREA.map((a) => a.area), []);

  const hostelOptions = useMemo(() => {
    const area = HOSTELS_BY_AREA.find((a) => a.area === selectedArea);
    return area ? area.hostels : [];
  }, [selectedArea]);

  const visibleHostels = useMemo(() => {
    if (!selectedArea) {
      // All hostels
      return HOSTELS_BY_AREA.flatMap((a) =>
        a.hostels.map((h) => ({ area: a.area, name: h })),
      );
    }

    const area = HOSTELS_BY_AREA.find((a) => a.area === selectedArea);
    if (!area) return [];

    const list = area.hostels.map((h) => ({ area: area.area, name: h }));
    if (!selectedHostel) return list;
    return list.filter((x) => x.name === selectedHostel);
  }, [selectedArea, selectedHostel]);

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
            Hostels
          </h1>
          <div className="text-muted">
            Browse hostels, rooms, and facilities.
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
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h2 className="h5 mb-0" style={{ fontWeight: 900 }}>
                    Directory
                  </h2>
                  <Button
                    style={{
                      borderRadius: 12,
                      border: "none",
                      fontWeight: 800,
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                    onClick={() => {
                      setSelectedArea("");
                      setSelectedHostel("");
                    }}
                  >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    Reset
                  </Button>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
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
                    Areas: {HOSTELS_BY_AREA.length}
                  </Badge>
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
                    Hostels: {visibleHostels.length}
                  </Badge>
                </div>

                {visibleHostels.length === 0 ? (
                  <div className="text-muted">
                    No hostels found for selection.
                  </div>
                ) : (
                  <ListGroup variant="flush">
                    {visibleHostels.map((h) => (
                      <ListGroup.Item
                        key={`${h.area}__${h.name}`}
                        className="d-flex align-items-start justify-content-between gap-3"
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                      >
                        <div>
                          <div style={{ fontWeight: 900 }}>{h.name}</div>
                          <div
                            className="text-muted"
                            style={{ fontWeight: 800, fontSize: "0.9rem" }}
                          >
                            Area: {h.area}
                          </div>
                        </div>
                        <Badge
                          bg=""
                          style={{
                            background: "rgba(99, 102, 241, 0.12)",
                            color: "#3730a3",
                            border: "1px solid rgba(99, 102, 241, 0.25)",
                            padding: "0.45rem 0.7rem",
                            borderRadius: 999,
                            fontWeight: 900,
                            height: "fit-content",
                          }}
                        >
                          Listed
                        </Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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
                <h2 className="h6" style={{ fontWeight: 900 }}>
                  Filters
                </h2>

                <Form className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 800 }}>
                      Area Name
                    </Form.Label>
                    <Form.Select
                      value={selectedArea}
                      onChange={(e) => {
                        const nextArea = e.target.value;
                        setSelectedArea(nextArea);
                        setSelectedHostel("");
                      }}
                      style={{
                        borderRadius: 12,
                        border: "1px solid rgba(139, 92, 246, 0.25)",
                        fontWeight: 800,
                      }}
                    >
                      <option value="">All Areas</option>
                      {areaOptions.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label style={{ fontWeight: 800 }}>
                      Hostel Name
                    </Form.Label>
                    <Form.Select
                      value={selectedHostel}
                      onChange={(e) => setSelectedHostel(e.target.value)}
                      disabled={!selectedArea}
                      style={{
                        borderRadius: 12,
                        border: "1px solid rgba(139, 92, 246, 0.25)",
                        fontWeight: 800,
                      }}
                    >
                      <option value="">
                        {selectedArea ? "All Hostels" : "Select Area first"}
                      </option>
                      {hostelOptions.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </Form.Select>
                    <div
                      className="text-muted mt-2"
                      style={{ fontWeight: 700, fontSize: "0.9rem" }}
                    >
                      Select an area to populate hostel names.
                    </div>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hostels;
