import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

const Blog = () => {
  const blogPosts = [
    {
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
      category: "Industry Insights",
      title: "The Future of Digital Payments in 2024",
      excerpt:
        "Explore the latest trends shaping the digital payment landscape and how businesses can stay ahead of the curve.",
      author: "Sarah Johnson",
      date: "Jan 15, 2024",
      readTime: "5 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      category: "Security",
      title: "Understanding PCI DSS Compliance",
      excerpt:
        "A comprehensive guide to PCI DSS compliance and why it matters for your business security.",
      author: "Michael Chen",
      date: "Jan 12, 2024",
      readTime: "7 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "Product Updates",
      title: "Introducing Advanced Analytics Dashboard",
      excerpt:
        "Get deeper insights into your financial data with our new analytics features and customizable reports.",
      author: "Emily Rodriguez",
      date: "Jan 10, 2024",
      readTime: "4 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
      category: "Best Practices",
      title: "Optimizing Payment Processing for E-commerce",
      excerpt:
        "Learn how to reduce cart abandonment and increase conversion rates with optimized payment flows.",
      author: "David Kim",
      date: "Jan 8, 2024",
      readTime: "6 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=600&h=400&fit=crop",
      category: "Case Study",
      title: "How TechStart Scaled to ₹80Cr with FenTech",
      excerpt:
        "Discover how one startup leveraged our platform to process millions in transactions and scale globally.",
      author: "Lisa Wang",
      date: "Jan 5, 2024",
      readTime: "8 min read",
    },
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      category: "Technology",
      title: "API Integration Made Simple",
      excerpt:
        "Step-by-step guide to integrating FenTech APIs into your application with code examples.",
      author: "Alex Turner",
      date: "Jan 3, 2024",
      readTime: "10 min read",
    },
  ];

  const categories = [
    "All Posts",
    "Industry Insights",
    "Security",
    "Product Updates",
    "Best Practices",
    "Case Study",
    "Technology",
  ];

  return (
    <section className="section-padding bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="section-title">Latest from Our Blog</h2>
          <p className="section-subtitle">
            Stay updated with the latest fintech trends, tips, and insights
          </p>
        </div>

        {/* Category Filter */}
        <div className="text-center mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category, index) => (
              <Badge
                key={index}
                bg={index === 0 ? "primary" : "light"}
                text={index === 0 ? "white" : "dark"}
                className="px-3 py-2 fw-normal"
                style={{ cursor: "pointer", fontSize: "0.9rem" }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <Row className="g-4 mb-5">
          {blogPosts.map((post, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className="h-100 border-0 shadow-sm overflow-hidden">
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
                <Card.Body className="p-4">
                  <Badge bg="primary" className="mb-3">
                    {post.category}
                  </Badge>
                  <Card.Title className="fw-bold mb-3">
                    <a href="#" className="text-decoration-none text-dark">
                      {post.title}
                    </a>
                  </Card.Title>
                  <Card.Text className="text-muted mb-4">
                    {post.excerpt}
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <div className="fw-semibold small">{post.author}</div>
                        <small className="text-muted">{post.date}</small>
                      </div>
                    </div>
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      {post.readTime}
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Newsletter Subscription */}
        <div className="bg-white rounded shadow-sm p-5 text-center">
          <i className="bi bi-envelope-heart fs-1 text-primary mb-3"></i>
          <h3 className="fw-bold mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-muted mb-4">
            Get the latest fintech insights, product updates, and exclusive
            content delivered to your inbox.
          </p>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="input-group input-group-lg">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <Button variant="primary">Subscribe</Button>
              </div>
              <small className="text-muted d-block mt-2">
                No spam. Unsubscribe anytime.
              </small>
            </Col>
          </Row>
        </div>

        {/* View All Button */}
        <div className="text-center mt-4">
          <Button variant="outline-primary" size="lg">
            View All Articles <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Blog;
