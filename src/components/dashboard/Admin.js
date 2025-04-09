import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Table, Row, Col } from "react-bootstrap";


function Admin() {
  const [lorryOwners, setLorryOwners] = useState([]);
  const [businessPeople, setBusinessPeople] = useState([]);
  const [inactiveLoads, setInactiveLoads] = useState([]);
  const [activeLoads, setActiveLoads] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/lorryowner").then((res) => setLorryOwners(res.data));
    axios.get("http://localhost:4000/businessperson").then((res) => setBusinessPeople(res.data));
    axios.get("http://localhost:4000/inActiveloads").then((res) => setInactiveLoads(res.data));
    axios.get("http://localhost:4000/activeLoads").then((res) => setActiveLoads(res.data));
  }, []);

  const renderTable = (data, title, columns) => (
    <Card className="p-3 shadow-sm mb-4">
      <h4 className="text-center mb-3">{title}</h4>
      <div className="table-responsive">
        <Table bordered hover>
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                {columns.map((col, cidx) => (
                  <td key={cidx}>{item[col.field] || "N/A"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Card>
  );

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      <Row>
        <Col lg={6} sm={12}>
          {renderTable(lorryOwners, "All Lorry Owners", [
            { label: "User Name", field: "username" },
            { label: "Email", field: "email" },
            { label: "Phone", field: "phone" },
          ])}
        </Col>

        <Col lg={6} sm={12}>
          {renderTable(businessPeople, "All Business Users", [
            { label: "User Name", field: "username" },
            { label: "Email", field: "email" },
            { label: "Phone", field: "phone" },
          ])}
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          {renderTable(inactiveLoads, "Inactive Loads", [
            { label: "Type", field: "type" },
            { label: "Pickup", field: "pickup" },
            { label: "Delivery", field: "delivery" },
            { label: "Urgency", field: "urgency" },
            { label: "Status", field: "status" },
            { label: "Posted By", field: "postedBy" },
          ])}
        </Col>
        <Col md={12}>
          {renderTable(activeLoads, "Active Loads", [
            { label: "Type", field: "type" },
            { label: "Pickup", field: "pickup" },
            { label: "Delivery", field: "delivery" },
            { label: "Urgency", field: "urgency" },
            { label: "Status", field: "status" },
            { label: "Posted By", field: "postedBy" },
            { label: "Lorry Owner Email", field: "lorryOwnerEmail" },
          ])}
        </Col>
      </Row>
    </Container>
  );
}

export default Admin;
