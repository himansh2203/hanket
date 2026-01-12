import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/hanket_image.ico";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const closeMenu = () => {
    setOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const wishlistCount = wishlistItems.length;

  return (
    <header className="wm-header">
      <div className="wm-container">
        {/* LOGO */}
        <Link to="/" className="wm-logo nav-link" onClick={closeMenu}>
          <img src={logo} alt="Hanket Logo" className="logo-img" />
          <span className="brand-text">HANKET</span>
        </Link>

        {/* NAV */}
        <nav className={`wm-nav ${open ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>
            HOME
          </Link>

          {/* ============== MENS ============== */}
          <div className="dropdown">
            <span
              className="nav-link dropdown-title"
              onClick={() => toggleDropdown("mens")}
            >
              <Link to="/products?category=mens" className="nav-link">
                {" "}
                MENS{" "}
              </Link>
              <ChevronDown
                className={activeDropdown === "mens" ? "rotate" : ""}
              />
            </span>

            <div
              className={`dropdown-menu ${
                activeDropdown === "mens" ? "show" : ""
              }`}
            >
              <Link
                to="/products?category=mens&subcategory=top-wear"
                onClick={closeMenu}
              >
                TOP WEAR
              </Link>
              <Link
                to="/products?category=mens&subcategory=sports-active-wear"
                onClick={closeMenu}
              >
                SPORTS & ACTIVE WEAR
              </Link>
              <Link
                to="/products?category=mens&subcategory=indian-festive-wear"
                onClick={closeMenu}
              >
                INDIAN & FESTIVE
              </Link>
              <Link
                to="/products?category=mens&subcategory=bottom-wear"
                onClick={closeMenu}
              >
                BOTTOM WEAR
              </Link>
              <Link
                to="/products?category=mens&subcategory=inner-sleepwear"
                onClick={closeMenu}
              >
                INNER & SLEEPWEAR
              </Link>
              <Link
                to="/products?category=mens&subcategory=fashion-accessories"
                onClick={closeMenu}
              >
                ACCESSORIES
              </Link>
              <Link
                to="/products?category=mens&subcategory=footwear"
                onClick={closeMenu}
              >
                FOOTWEAR
              </Link>
            </div>
          </div>

          {/* ============== WOMENS ============== */}
          <div className="dropdown">
            <span
              className="nav-link dropdown-title"
              onClick={() => toggleDropdown("womens")}
            >
              <Link to="/products?category=womens" className="nav-link">
                {" "}
                WOMENS{" "}
              </Link>
              <ChevronDown
                className={activeDropdown === "womens" ? "rotate" : ""}
              />
            </span>

            <div
              className={`dropdown-menu ${
                activeDropdown === "womens" ? "show" : ""
              }`}
            >
              <Link
                to="/products?category=womens&subcategory=indian-fusion-wear"
                onClick={closeMenu}
              >
                INDIAN & FUSION
              </Link>
              <Link
                to="/products?category=womens&subcategory=lingerie-sleepwear"
                onClick={closeMenu}
              >
                LINGERIE & SLEEP
              </Link>
              <Link
                to="/products?category=womens&subcategory=western-wear"
                onClick={closeMenu}
              >
                WESTERN
              </Link>
              <Link
                to="/products?category=womens&subcategory=footwear"
                onClick={closeMenu}
              >
                FOOTWEAR
              </Link>
              <Link
                to="/products?category=womens&subcategory=bottom-wear"
                onClick={closeMenu}
              >
                BOTTOM WEAR
              </Link>
              <Link
                to="/products?category=womens&subcategory=sports-active-wear"
                onClick={closeMenu}
              >
                SPORTS WEAR
              </Link>
              <Link
                to="/products?category=womens&subcategory=beauty-personal-care"
                onClick={closeMenu}
              >
                BEAUTY
              </Link>
              <Link
                to="/products?category=womens&subcategory=jewellery"
                onClick={closeMenu}
              >
                JEWELLERY
              </Link>
            </div>
          </div>

          {/* ============== KIDS ============== */}
          <div className="dropdown">
            <span
              className="nav-link dropdown-title"
              onClick={() => toggleDropdown("kids")}
            >
              <Link to="/products?category=kids" className="nav-link">
                {" "}
                KIDS{" "}
              </Link>
              <ChevronDown
                className={activeDropdown === "kids" ? "rotate" : ""}
              />
            </span>

            <div
              className={`dropdown-menu ${
                activeDropdown === "kids" ? "show" : ""
              }`}
            >
              <Link
                to="/products?category=kids&subcategory=boys-clothing"
                onClick={closeMenu}
              >
                BOYS
              </Link>
              <Link
                to="/products?category=kids&subcategory=girls-clothing"
                onClick={closeMenu}
              >
                GIRLS
              </Link>
              <Link
                to="/products?category=kids&subcategory=footwear"
                onClick={closeMenu}
              >
                FOOTWEAR
              </Link>
              <Link
                to="/products?category=kids&subcategory=infants"
                onClick={closeMenu}
              >
                INFANTS
              </Link>
              <Link
                to="/products?category=kids&subcategory=kids-accessories"
                onClick={closeMenu}
              >
                ACCESSORIES
              </Link>
              <Link
                to="/products?category=kids&subcategory=toys-games"
                onClick={closeMenu}
              >
                TOYS
              </Link>
            </div>
          </div>

          <Link
            to="/products?category=genz"
            className="nav-link buy"
            onClick={closeMenu}
          >
            GENZ
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="wm-actions">
          <Link to="/login" className="nav-link" onClick={closeMenu}>
            LOGIN / REGISTER
          </Link>

          <Link to="/favourite" className="cart nav-link">
            <Heart />
            {wishlistCount > 0 && (
              <span className="badge">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="cart nav-link">
            <ShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
            <span className="price">₹{totalPrice.toFixed(2)}</span>
          </Link>
        </div>

        <button className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
