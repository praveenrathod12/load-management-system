import React from 'react'
import './Footer.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    
    <Navbar fixed="bottom" className="bg-primary text-white py-2">
      <Container className="d-flex justify-content-end">
        <p className="mb-0 small">
          For any queries, contact: <a href="mailto:abcde@gmail.com" className="text-white fw-bold text-decoration-underline">abcde@gmail.com</a>
        </p>
      </Container>
    </Navbar>

   
  )
}

export default Footer
