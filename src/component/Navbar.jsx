import React, { useState } from "react";
import "../style/Navbar.css";
import logo from "../assets/hanket_image.ico";

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

        {/* Hamburger Icon */}
        <div className="nav-hamburger" onClick={() => setOpen(!open)}>
          <span className={open ? "line line1" : "line"}></span>
          <span className={open ? "line line2" : "line"}></span>
          <span className={open ? "line line3" : "line"}></span>
        </div>

        {/* Navigation Links */}
        <ul className={open ? "nav-links nav-open" : "nav-links"}>
          <li>
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="nav-link">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
