// import React, { useState } from "react";
// import "../style/Navbar.css";
// import logo from "../assets/hanket_image.ico";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <nav className="nav premium-nav">
//       <div className="nav-container">
//         {/* Logo */}
//         <div className="nav-logo">
//           <img src={logo} alt="Hanket Logo" className="logo-img" />
//           <span className="brand-text">HANKET</span>
//         </div>

//         {/* Hamburger */}
//         <div className="nav-hamburger" onClick={() => setOpen(!open)}>
//           <span className={open ? "line line1" : "line"}></span>
//           <span className={open ? "line line2" : "line"}></span>
//           <span className={open ? "line line3" : "line"}></span>
//         </div>

//         {/* Links */}
//         <ul className={open ? "nav-links nav-open" : "nav-links"}>
//           <li>
//             <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/about"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/services"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Services
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/contact"
//               className="nav-link"
//               onClick={() => setOpen(false)}
//             >
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import logo from "../assets/hanket_image.ico";

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
            <span className="nav-link">CATEGORIES</span>
            <div className="dropdown-menu">
              <Link to="/shop-layouts" onClick={closeMenu}>
                Mens
              </Link>
              <Link to="/product-types" onClick={closeMenu}>
                Womens
              </Link>
              <Link to="/categories" onClick={closeMenu}>
                Kids
              </Link>
              <Link to="/acessosries" onClick={closeMenu}>
                Accessories
              </Link>
            </div>
          </div>

          <div className="dropdown">
            <Link className="nav-link" to="/genz" onClick={closeMenu}>
              <span>GEN-Z</span>
            </Link>
            {/* <div className="dropdown-menu">
              <Link to="/blog-grid" onClick={closeMenu}>
                Blog Grid
              </Link>
              <Link to="/blog-list" onClick={closeMenu}>
                Blog List
              </Link>
            </div> */}
          </div>

          <div className="dropdown">
            <span className="nav-link">PAGES</span>
            <div className="dropdown-menu">
              <Link to="/about" onClick={closeMenu}>
                About Us
              </Link>
              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>
              <Link to="/faq" onClick={closeMenu}>
                FAQ
              </Link>
            </div>
          </div>

          <Link to="/buy" className="nav-link buy" onClick={closeMenu}>
            BUY
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
            <span className="price">$0.00</span>
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
