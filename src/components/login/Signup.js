import React, { useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

  //navigate manually
  let navigate = useNavigate();



  let { register, handleSubmit, formState: { errors } } = useForm();
  let [selectedUser, setSelectedUser] = useState('');

  //to handle error while signup
  let [err, setErr] = useState("")

  let addUser = (data) => {
    if (!selectedUser || selectedUser === "select any one") {
      alert("Please select the type of customer");
      return;
    }
    let fullData = { ...data, userType: selectedUser };

    // console.log("Signup Data:", fullData);
    //make http request to store data fron signup page
    if (fullData.userType === "Business Person") {
      axios.post("http://localhost:4000/businessperson", fullData)
        .then(response => {
          if (response.status === 201) {
            setErr("")
            //navigate to login page
            navigate("/login");
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            setErr(err.message)
          }
          else if (err.request) {
            setErr(err.message)
          }
          else {
            setErr(err.message)
          }
        })
    }
    else if (fullData.userType === "Lorry Owner") {
      axios.post("http://localhost:4000/lorryowner", fullData)
        .then(response => {
          if (response.status === 201) {
            setErr("")
            //navigate to login page
            navigate("/login");
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            setErr(err.message)
          }
          else if (err.request) {
            setErr(err.message)
          }
          else {
            setErr(err.message)
          }
        })
    }
    else {
      axios.post("http://localhost:4000/admin", fullData)
        .then(response => {
          if (response.status === 201) {
            setErr("")
            //navigate to login page
            navigate("/login");
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response) {
            setErr(err.message)
          }
          else if (err.request) {
            setErr(err.message)
          }
          else {
            setErr(err.message)
          }
        })
    }

  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-start" style={{ paddingTop: '23px' }}>
      <Row className="w-100">
        {err.length != 0 && <p className="display-3 font-bold text-center text-danger">{err}</p>}
        <Col xs={12} sm={8} md={6} lg={5} xl={4} className="mx-auto">
          <Card className="p-4 shadow rounded border-0">
            <Card.Body>
              <Card.Title className="text-center fs-4 fw-bold mb-3">Sign Up</Card.Title>

              <Form onSubmit={handleSubmit(addUser)}>
                <Form.Group className="mb-2">
                  <Form.Label>Select User Type</Form.Label>
                  <Form.Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="select any one">Select any one</option>
                    <option value="Lorry Owner">Lorry Owner</option>
                    <option value="Business Person">Business Person</option>
                    <option value="Admin">Admin</option>
                  </Form.Select>
                  {selectedUser === "select any one" && (
                    <p className="text-danger small mt-1">Select the type of customer</p>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", { required: "*Email is required" })}
                  />
                  {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    {...register("username", { required: "*Username is required" })}
                  />
                  {errors.username && <p className="text-danger small mt-1">{errors.username.message}</p>}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("password", { required: "*Password is required" })}
                  />
                  {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
                </Form.Group>



                <Button type="submit" variant="success" className="w-100 mt-2">Sign Up</Button>
              </Form>

              <div className="text-center mt-3">
                <span className="small">Already have an account? <Link to="/login">Login</Link></span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
