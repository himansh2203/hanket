import React from "react";
import "../style/Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* -------- TOP SECTION -------- */}
        <div className="footer-section">
          <h3>HANKET</h3>
          <p>
            Discover premium quality products with fast delivery, secure
            payments, and a seamless shopping experience.
          </p>
        </div>

        {/* -------- QUICK LINKS -------- */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* -------- SUPPORT LINKS -------- */}
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/help">Help Center</Link>
            </li>
            <li>
              <Link to="/order-tracking">Order Tracking</Link>
            </li>
            <li>
              <Link to="/shipping-info">Shipping Info</Link>
            </li>
          </ul>
        </div>

        {/* -------- SOCIAL LINKS -------- */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/hanketstudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://www.instagram.com/hanketstudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>

            <a
              href="https://www.instagram.com/hanketstudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>

            <a
              href="https://www.instagram.com/hanketstudio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* -------- BOTTOM BAR -------- */}
      <div className="footer-bottom">© 2025 HANKET — All Rights Reserved.</div>
    </footer>
  );
};

export default Footer;
