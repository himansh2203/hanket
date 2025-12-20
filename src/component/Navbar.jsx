import React, { useState } from "react";
import "../style/Navbar.css";
import logo from "../assets/hanket_image.ico";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav premium-nav">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src={logo} alt="Hanket Logo" className="logo-img" />
          <span className="brand-text">HANKET</span>
        </div>

        {/* Hamburger */}
        <div className="nav-hamburger" onClick={() => setOpen(!open)}>
          <span className={open ? "line line1" : "line"}></span>
          <span className={open ? "line line2" : "line"}></span>
          <span className={open ? "line line3" : "line"}></span>
        </div>

        {/* Links */}
        <ul className={open ? "nav-links nav-open" : "nav-links"}>
          <li>
            <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
