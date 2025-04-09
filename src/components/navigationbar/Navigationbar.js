import React, { useContext } from 'react';
import './Navigationbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiLogin } from "react-icons/ci";
import { FaUserCircle, FaBars } from "react-icons/fa";
import logo from '../images/1.jpg';
import { AuthContext } from '../../contexts/AuthProvider'; // You'll create this

function Navigationbar() {
  const { isLoggedIn, setIsLoggedIn, userType } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const activeLink = {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold"
  };

  const inactiveLink = {
    color: "white",
    fontSize: "1.0rem"
  };

    // Determine user-specific dashboard path and label
    const getDashboardPath = () => {
      switch (userType) {
        case "Admin": return "/admin";
        case "Business person": return "/business";
        case "Lorry Owner": return "/lorryowner";
        default: return "/";
      }
    };
  
    const getDashboardLabel = () => {
      switch (userType) {
        case "Admin": return "Admin Dashboard";
        case "Business person": return "Business Dashboard";
        case "Lorry Owner": return "Lorry Dashboard";
        default: return "";
      }
    };

  return (
    <nav className="navbar navbar-expand bg-body-tertiary custom-navbar">
      <div className="container-fluid flex-column">

        {/* Title Centered */}
        <div className="w-100 text-center title-bar">
          <h3 className="navbar-title text-white m-0">Load Management System</h3>
        </div>

        {/* Navigation Links Row */}
        <div className="collapse navbar-collapse w-100 d-flex justify-content-between align-items-center" id="navbarText">
          
          {/* Left side - About or Home */}
          <ul className="navbar-nav m-0">
            <li className="nav-item">
              <NavLink className="nav-link" style={({ isActive }) => isActive ? activeLink : inactiveLink} to={isLoggedIn ? "/about" : "/"}>
                <img className="imga" src={logo} alt="Logo" /> {isLoggedIn ? "About" : "Home"}
              </NavLink>
            </li>
                        {/* Show dashboard link only if logged in and userType is defined */}
                        {isLoggedIn && userType && (
              <li className="nav-item ms-3">
                <NavLink
                  className="nav-link"
                  style={({ isActive }) => isActive ? activeLink : inactiveLink}
                  to={getDashboardPath()}
                >
                  {getDashboardLabel()}
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right side - Login or Menu */}
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  ☰
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link text-white">
                  Login
                </NavLink>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navigationbar;
