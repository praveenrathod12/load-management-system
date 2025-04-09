import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthProvider';
import './Lorryowner.css';

function Lorryowner() {
  const { userEmail, userName } = useContext(AuthContext);
  const [inactiveLoads, setInactiveLoads] = useState([]);
  const [myTruckStatus, setMyTruckStatus] = useState([]);

  useEffect(() => {
    fetchInactiveLoads();
    fetchMyTruckStatus();
  }, []);

  const fetchInactiveLoads = async () => {
    try {
      const res = await axios.get('http://localhost:4000/inActiveloads');
      setInactiveLoads(res.data);
    } catch (error) {
      console.error('Error fetching inactive loads:', error);
    }
  };

  const fetchMyTruckStatus = async () => {
    try {
      const res = await axios.get('http://localhost:4000/activeLoads');
      const myLoads = res.data.filter(load => load.lorryOwnerEmail === userEmail);
      setMyTruckStatus(myLoads);
    } catch (error) {
      console.error('Error fetching active loads:', error);
    }
  };

  const handleAcceptLoad = async (load) => {
    try {
      const acceptedLoad = {
        ...load,
        status: 'Active',
        lorryOwnerEmail: userEmail,
        lorryOwnerName: userName
      };

      await axios.post('http://localhost:4000/activeLoads', acceptedLoad);
      await axios.delete(`http://localhost:4000/inActiveloads/${load.id}`);

      fetchInactiveLoads();
      fetchMyTruckStatus();
    } catch (error) {
      console.error('Error accepting load:', error);
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="text-center mb-4">Lorry Owner Dashboard</h2>

      <Row className="mb-4">
        <Col lg={12}>
          <Card className="p-3 shadow-sm">
            <h4>Available Loads</h4>
            <Table responsive bordered hover className="mt-2">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Pickup</th>
                  <th>Delivery</th>
                  <th>Urgency</th>
                  <th>Posted By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inactiveLoads.map((load) => (
                  <tr key={load.id}>
                    <td>{load.type}</td>
                    <td>{load.pickup}</td>
                    <td>{load.delivery}</td>
                    <td>{load.urgency}</td>
                    <td>{load.postedByName} ({load.postedBy})</td>
                    <td>
                      <Button size="sm" variant="success" onClick={() => handleAcceptLoad(load)}>
                        Accept Load
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card className="p-3 shadow-sm">
            <h4>My Truck Status</h4>
            <Table responsive bordered hover className="mt-2">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Pickup</th>
                  <th>Delivery</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Posted By</th>
                </tr>
              </thead>
              <tbody>
                {myTruckStatus.map((load) => (
                  <tr key={load.id}>
                    <td>{load.type}</td>
                    <td>{load.pickup}</td>
                    <td>{load.delivery}</td>
                    <td>{load.urgency}</td>
                    <td>{load.status}</td>
                    <td>{load.postedByName} ({load.postedBy})</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Lorryowner;
