import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from 'axios';
import { Form, Button, Table, Card, Container, Row, Col } from "react-bootstrap";
import './Businessperson.css';

function Businessperson() {
  const { userEmail, userName } = useContext(AuthContext);
  const [form, setForm] = useState({ type: "", pickup: "", delivery: "", urgency: "" });
  const [activeLoads, setActiveLoads] = useState([]);
  const [lorryOwners, setLorryOwners] = useState([]);

  const loadTypes = ["Type 1", "Type 2", "Type 3", "Type 4"];
  const locations = ["Location 1", "Location 2", "Location 3", "Location 4"];
  const urgencyLevels = ["Low", "Medium", "High"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newLoad = { 
        ...form, 
        postedBy: userEmail, 
        postedByName: userName, 
        status: "Pending" 
      };
      await axios.post("http://localhost:4000/inActiveloads", newLoad);
      alert("Load posted successfully!");
      setForm({ type: "", pickup: "", delivery: "", urgency: "" });
    } catch (err) {
      console.error("Error posting load:", err);
    }
  };

  const fetchActiveLoads = async () => {
    const res = await axios.get("http://localhost:4000/activeLoads");
    const userLoads = res.data.filter((load) => load.postedBy === userEmail);
    setActiveLoads(userLoads);
  };

  const fetchLorryOwners = async () => {
    const res = await axios.get("http://localhost:4000/lorryowner");
    setLorryOwners(res.data);
  };

  useEffect(() => {
    fetchActiveLoads();
    fetchLorryOwners();
  }, []);

  return (
    <Container fluid className="py-4 px-3">
      <h2 className="text-center mb-4">Business Dashboard</h2>
      <Row className="mb-4">
        <Col lg={6} md={12} className="mb-4">
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3">Post New Load</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Load Type</Form.Label>
                <Form.Select name="type" value={form.type} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  {loadTypes.map((type, idx) => (
                    <option key={idx} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Pickup Location</Form.Label>
                <Form.Select name="pickup" value={form.pickup} onChange={handleChange} required>
                  <option value="">Select Pickup</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Delivery Location</Form.Label>
                <Form.Select name="delivery" value={form.delivery} onChange={handleChange} required>
                  <option value="">Select Delivery</option>
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Urgency</Form.Label>
                <Form.Select name="urgency" value={form.urgency} onChange={handleChange} required>
                  <option value="">Select Urgency</option>
                  {urgencyLevels.map((level, idx) => (
                    <option key={idx} value={level}>{level}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 mt-2">Post Load</Button>
            </Form>
          </Card>
        </Col>

        <Col lg={6} md={12}>
          <Card className="p-3 shadow-sm">
            <h4>Available Lorry Owners</h4>
            <Table bordered hover size="sm" responsive className="mt-2">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {lorryOwners.map((owner, idx) => (
                  <tr key={idx}>
                    <td>{owner.username}</td>
                    <td>{owner.email}</td>
                    <td>{owner.phone}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Card className="p-3 shadow-sm">
        <h4>Your Active Loads</h4>
        <Table bordered hover responsive className="mt-2">
          <thead>
            <tr>
              <th>Type</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Lorry Owner</th>
            </tr>
          </thead>
          <tbody>
            {activeLoads.map((load, idx) => (
              <tr key={idx}>
                <td>{load.type}</td>
                <td>{load.pickup}</td>
                <td>{load.delivery}</td>
                <td>{load.urgency}</td>
                <td>{load.status}</td>
                <td>{load.lorryOwnerEmail || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}

export default Businessperson;
