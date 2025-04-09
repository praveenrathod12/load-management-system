import React from 'react';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import logo1 from '../images/1.jpg';
import logo2 from '../images/2.jpeg';
import logo3 from '../images/3.jpg';

function Home() {
  return (
    <div className="home-container">
      <h2 className="text-center text-warning mb-4 display-4 fw-bold home-title">Welcome to Load Management System</h2>

      <div className="carousel-responsive mb-5">
        <Carousel interval={3000} fade>
          <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={logo1} alt="First slide" />
            <Carousel.Caption>
              <h5>Seamless Load Posting</h5>
              <p>Empowering businesses to manage logistics efficiently.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={logo2} alt="Second slide" />
            <Carousel.Caption>
              <h5>Connect with Trusted Lorry Owners</h5>
              <p>Reliable transport partners at your fingertips.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={logo3} alt="Third slide" />
            <Carousel.Caption>
              <h5>Real-Time Load Tracking</h5>
              <p>Stay informed every step of the journey.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="info-section text-center py-5">
        <h3 className="mb-3">🚛 Simplifying Logistics, One Load at a Time</h3>
        <p className="lead px-3 px-md-5">
          Our platform bridges the gap between businesses and logistics providers with real-time coordination, seamless communication,
          and complete transparency. Whether you're a business owner or a truck driver, our dashboard gives you the tools you need to succeed.
        </p>
        <div className="cta-box mt-4">
          <h4 className="mb-2">💡 Get Started Today!</h4>
          <p className="small">Experience smart logistics like never before.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
