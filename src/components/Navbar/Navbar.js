// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ alertCount }) => {
  const navigate = useNavigate();

  const handleAlertsClick = () => {
    navigate("/alerts");
  };

  return (
    <nav className="navbar">
      <div className="logo">REMOS</div>
      <div className="nav-icons">
        <div className="alert-icon" onClick={handleAlertsClick}>
          <FaBell />
          {alertCount > 0 && <span className="alert-count">{alertCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
