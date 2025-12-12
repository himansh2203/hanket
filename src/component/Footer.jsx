import React from "react";
import "../style/Footer.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

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

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/faq">FAQs</a>
            </li>
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/order-tracking">Order Tracking</a>
            </li>
            <li>
              <a href="/shipping-info">Shipping Info</a>
            </li>
          </ul>
        </div>

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
      <div className="footer-bottom">
        © {new Date().getFullYear()} HANKET — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
