import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Forgotpassword() {
  let { register, handleSubmit, formState: { errors } } = useForm();

  let navigate=useNavigate();

  let changePassword = async (data) => {
    console.log("Reset Password Data:", data);
  
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      // Get all users
      let res = await axios.get("http://localhost:4000/users");
  
      // Find user by email
      let user = res.data.find((u) => u.email === data.email);
  
      if (!user) {
        alert("No user found with this email.");
        return;
      }
  
      // Update password using PATCH request
      await axios.patch(`http://localhost:4000/users/${user.id}`, {
        password: data.password,
      });
  
      alert("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Password reset error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };
  


return (
  <Container fluid className="d-flex justify-content-center align-items-start" style={{ paddingTop: '23px' }}>
    <Row className="w-100">
      <Col xs={12} sm={8} md={6} lg={5} xl={4} className="mx-auto">
        <Card className="p-4 shadow rounded border-0">
          <Card.Body>
            <Card.Title className="text-center fs-4 fw-bold mb-3">Reset Password</Card.Title>

            <Form onSubmit={handleSubmit(changePassword)}>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register("email", { required: "*Email is required" })}
                />
                {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("password", { required: "*New password is required" })}
                />
                {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword", { required: "*Confirm password is required" })}
                />
                {errors.confirmPassword && <p className="text-danger small mt-1">{errors.confirmPassword.message}</p>}
              </Form.Group>

              <Button type="submit" variant="success" className="w-100 mt-2">Reset Password</Button>
            </Form>

            <div className="text-center mt-3">
              <span className="small">Remembered your password? <Link to="/login">Login</Link></span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
}

export default Forgotpassword;
