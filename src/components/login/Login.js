import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const userLogin = async (data) => {
    let endpoint = "";
    let redirect = "";

    if (data.userType === "Business person") {
      endpoint = "businessperson";
      redirect = "/business";
    } else if (data.userType === "Lorry Owner") {
      endpoint = "lorryowner";
      redirect = "/lorryowner";
    } else if (data.userType === "Admin") {
      endpoint = "admin";
      redirect = "/admin";
    } else {
      alert("Invalid user type.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/${endpoint}`);
      const user = res.data.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (user) {
        // ✅ Use login from context to store email and userType
        login(data.email, data.userType);

        // ✅ Navigate to respective dashboard
        navigate(redirect);
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-start" style={{ paddingTop: '23px' }}>
      <Row className="w-100">
        <Col xs={12} sm={8} md={6} lg={5} xl={4} className="mx-auto">
          <Card className="p-4 shadow rounded border-0">
            <Card.Body>
              <Card.Title className="text-center fs-4 fw-bold mb-3">Login</Card.Title>

              <Form onSubmit={handleSubmit(userLogin)}>

                <Form.Group className="mb-2">
                  <Form.Label>User Type</Form.Label>
                  <Form.Select {...register("userType", { required: "*User type is required" })}>
                    <option value="">Select</option>
                    <option value="Business person">Business Person</option>
                    <option value="Lorry Owner">Lorry Owner</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                  {errors.userType && <p className="text-danger small mt-1">{errors.userType.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", { required: "*Email is required" })}
                  />
                  {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", { required: "*Password is required" })}
                  />
                  {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
                </Form.Group>

                <Button type="submit" variant="success" className="w-100 mt-2">Login</Button>
              </Form>

              <div className="text-center mt-3">
                <Link className="d-block small mb-3" to="/forgot-password">Forgot Password?</Link>
                <span className="small">Not a member? <Link to="/signup">Signup</Link></span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
