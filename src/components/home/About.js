import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

function About() {
  return (
    <Container fluid className="about-page py-5 px-4">
      <h2 className="text-center mb-4 about-heading">About Load Management System</h2>
      <p className="text-center lead mb-5">
        Our Load Management System is a smart logistics platform designed to streamline load posting, allocation, and tracking for all stakeholders.
      </p>

      <Row className="gy-4">
        <Col md={4}>
          <Card className="h-100 shadow-lg about-card">
            <Card.Body>
              <Card.Title>📦 For Business Users</Card.Title>
              <Card.Text>
                Seamlessly post loads with detailed requirements like type, pickup and delivery locations, and urgency. Instantly reach available lorry owners and track the status of your consignments with ease.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-lg about-card">
            <Card.Body>
              <Card.Title>🚛 For Lorry Owners</Card.Title>
              <Card.Text>
                View all pending loads posted by businesses and accept the ones that fit your availability. Get clear visibility into your current assignments and manage truck logistics effectively.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-lg about-card">
            <Card.Body>
              <Card.Title>🛠️ For Admin</Card.Title>
              <Card.Text>
                Admins gain complete control and transparency over all activities in the system — user management, load monitoring, and system status. Admins ensure fairness, reliability, and smooth operation.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="p-4 text-center shadow-lg about-card-cta">
            <h4>Why Choose Our Platform?</h4>
            <p>
              We bridge the gap between logistics providers and businesses, making transport planning faster, cheaper, and more efficient.
              Whether you're looking to move goods or drive a truck, our system ensures you’re always connected to the right partner.
            </p>
            <p className="fw-bold">Efficient. Transparent. Reliable.</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
