import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import logo from "../assets/hanket_image.ico";
import { useSearchParams } from "react-router-dom";

import Favourite from "../page/Favourite";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <header className="wm-header">
      <div className="wm-container">
        {/* Logo */}
        <Link to="/" className="wm-logo nav-link" onClick={closeMenu}>
          <img src={logo} alt="Hanket Logo" className="logo-img" />
          <span className="brand-text">HANKET</span>
        </Link>
        {/* Navigation */}
        <nav className={`wm-nav ${open ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            HOME
          </Link>

          <div className="dropdown">
            <span className="nav-link">
              <Link to="/products?category=mens" className="nav-link">
                MENS
              </Link>
            </span>
            <div className="dropdown-menu">
              <Link to="/shop-layouts" onClick={closeMenu}>
                TOP WEAR
              </Link>
              <Link to="/product-types" onClick={closeMenu}>
                SPORTS AND ACTIVE WEARS
              </Link>
              <Link to="/categories" onClick={closeMenu}>
                INIDAN AND FESTIVE WEARS
              </Link>
              <Link to="/acessosries" onClick={closeMenu}>
                BOTTOM WEARS
              </Link>
              <Link to="/shop-layouts" onClick={closeMenu}>
                INNER WEAR AND SLEEPWEAR
              </Link>
              <Link to="/product-types" onClick={closeMenu}>
                FASHION ACCESSSIORIES
              </Link>
              <Link to="/categories" onClick={closeMenu}>
                FOOTWEARS
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <Link className="nav-link" to="/genz" onClick={closeMenu}>
              <span>WOMENS</span>
            </Link>
            <div className="dropdown-menu">
              <Link to="/blog-grid" onClick={closeMenu}>
                INDIAN AND FUSION WEAR
              </Link>
              <Link to="/blog-list" onClick={closeMenu}>
                LINGERIE AND SLEEPWEAR
              </Link>
              <Link to="/blog-grid" onClick={closeMenu}>
                WESTERN WEAR
              </Link>
              <Link to="/blog-list" onClick={closeMenu}>
                FOOTWEAR
              </Link>
              <Link to="/acessosries" onClick={closeMenu}>
                BOTTOM WEARS
              </Link>
              <Link to="/shop-layouts" onClick={closeMenu}>
                SPORTS WEAR AND ACTIVE WEAR
              </Link>
              <Link to="/product-types" onClick={closeMenu}>
                BEAUTY AND PERSONAL CARE
              </Link>
              <Link to="/categories" onClick={closeMenu}>
                JEWELLERY
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <span className="nav-link">KIDS</span>
            <div className="dropdown-menu">
              <Link to="/about" onClick={closeMenu}>
                BOYS CLOTHING
              </Link>
              <Link to="/contact" onClick={closeMenu}>
                GIRLS CLOTHING
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                FOOTWEAR
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                INFANTS
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                KIDS ACCESSSIORIES
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                TOYS AND GAMES
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <span className="nav-link">HOME DECOR</span>
            <div className="dropdown-menu">
              <Link to="/about" onClick={closeMenu}>
                HANDLOOM
              </Link>
              <Link to="/contact" onClick={closeMenu}>
                BATH
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                ROOM DECOR
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                KITCHEN AND TABLES
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                FLOORING
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                LAMPS AND LIGHTING
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                WEDDING AND CORPORATE GIFTING
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <span className="nav-link">SKINCARE PRODUCTS</span>
            <div className="dropdown-menu">
              <Link to="/about" onClick={closeMenu}>
                MAKEUP
              </Link>
              <Link to="/contact" onClick={closeMenu}>
                SKINCARE,BATH AND BODY
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                HAIRCARE
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                APPLIANCES
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                FRAGRANCES
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                BEAUTY GIFT AND MAKEKUP SET
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                MENS GROOMING
              </Link>
            </div>
          </div>

          <Link to="/buy" className="nav-link buy" onClick={closeMenu}>
            GENZ
          </Link>
        </nav>
        {/* Right Actions */}
        <div className="wm-actions">
          <Link to="/login" className="nav-link login" onClick={closeMenu}>
            LOGIN / REGISTER
          </Link>

          <Search className="icon" />
          <Heart className="icon" onClick={() => navigate("/favourite")} />

          <Link to="/cart" className="cart nav-link" onClick={closeMenu}>
            <ShoppingCart onClick={() => navigate("/cart")} />
            <span className="badge">0</span>
            <span className="price">₹0.00</span>
          </Link>
        </div>
        {/* Hamburger */}
        {/* <div className="nav-hamburger" onClick={() => setOpen(!open)}>
          <span className={open ? "line line1" : "line"}></span>
          <span className={open ? "line line2" : "line"}></span>
          <span className={open ? "line line3" : "line"}></span>
        </div> */}
        {/* Links */}
        {/* <ul className={open ? "nav-links nav-open" : "nav-links"}>
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
        </ul> */}
        {/* <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>{" "} */}
        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
