import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import logo from "../assets/hanket_image.ico";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
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

          {/* ================= MENS ================= */}
          <div className="dropdown">
            <Link to="/products?category=mens" className="nav-link">
              MENS
            </Link>
            <div className="dropdown-menu">
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
                SPORTS AND ACTIVE WEARS
              </Link>
              <Link
                to="/products?category=mens&subcategory=indian-festive-wear"
                onClick={closeMenu}
              >
                INDIAN AND FESTIVE WEARS
              </Link>
              <Link
                to="/products?category=mens&subcategory=bottom-wear"
                onClick={closeMenu}
              >
                BOTTOM WEARS
              </Link>
              <Link
                to="/products?category=mens&subcategory=inner-sleepwear"
                onClick={closeMenu}
              >
                INNER WEAR AND SLEEPWEAR
              </Link>
              <Link
                to="/products?category=mens&subcategory=fashion-accessories"
                onClick={closeMenu}
              >
                FASHION ACCESSORIES
              </Link>
              <Link
                to="/products?category=mens&subcategory=footwear"
                onClick={closeMenu}
              >
                FOOTWEARS
              </Link>
            </div>
          </div>

          {/* ================= WOMENS ================= */}
          <div className="dropdown">
            <Link to="/products?category=womens" className="nav-link">
              WOMENS
            </Link>
            <div className="dropdown-menu">
              <Link
                to="/products?category=womens&subcategory=indian-fusion-wear"
                onClick={closeMenu}
              >
                INDIAN AND FUSION WEAR
              </Link>
              <Link
                to="/products?category=womens&subcategory=lingerie-sleepwear"
                onClick={closeMenu}
              >
                LINGERIE AND SLEEPWEAR
              </Link>
              <Link
                to="/products?category=womens&subcategory=western-wear"
                onClick={closeMenu}
              >
                WESTERN WEAR
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
                BOTTOM WEARS
              </Link>
              <Link
                to="/products?category=womens&subcategory=sports-active-wear"
                onClick={closeMenu}
              >
                SPORTS AND ACTIVE WEAR
              </Link>
              <Link
                to="/products?category=womens&subcategory=beauty-personal-care"
                onClick={closeMenu}
              >
                BEAUTY AND PERSONAL CARE
              </Link>
              <Link
                to="/products?category=womens&subcategory=jewellery"
                onClick={closeMenu}
              >
                JEWELLERY
              </Link>
            </div>
          </div>

          {/* ================= KIDS ================= */}
          <div className="dropdown">
            <Link to="/products?category=kids" className="nav-link">
              KIDS
            </Link>
            <div className="dropdown-menu">
              <Link
                to="/products?category=kids&subcategory=boys-clothing"
                onClick={closeMenu}
              >
                BOYS CLOTHING
              </Link>
              <Link
                to="/products?category=kids&subcategory=girls-clothing"
                onClick={closeMenu}
              >
                GIRLS CLOTHING
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
                KIDS ACCESSORIES
              </Link>
              <Link
                to="/products?category=kids&subcategory=toys-games"
                onClick={closeMenu}
              >
                TOYS AND GAMES
              </Link>
            </div>
          </div>

          {/* ================= HOME DECOR ================= */}
          <div className="dropdown">
            <Link to="/products?category=home-decor" className="nav-link">
              HOME DECOR
            </Link>
            <div className="dropdown-menu">
              <Link
                to="/products?category=home-decor&subcategory=handloom"
                onClick={closeMenu}
              >
                HANDLOOM
              </Link>
              <Link
                to="/products?category=home-decor&subcategory=bath"
                onClick={closeMenu}
              >
                BATH
              </Link>
              <Link
                to="/products?category=home-decor&subcategory=room-decor"
                onClick={closeMenu}
              >
                ROOM DECOR
              </Link>
              <Link
                to="/products?category=home-decor&subcategory=kitchen-table"
                onClick={closeMenu}
              >
                KITCHEN AND TABLE
              </Link>
              <Link
                to="/products?category=home-decor&subcategory=flooring"
                onClick={closeMenu}
              >
                FLOORING
              </Link>
              <Link
                to="/products?category=home-decor&subcategory=lamps-lighting"
                onClick={closeMenu}
              >
                LAMPS AND LIGHTING
              </Link>
              <Link
                to="/products?category=home-decor&subcategory=wedding-corporate-gifting"
                onClick={closeMenu}
              >
                WEDDING & CORPORATE GIFTING
              </Link>
            </div>
          </div>

          {/* ================= SKINCARE ================= */}
          <div className="dropdown">
            <Link to="/products?category=skincare" className="nav-link">
              SKINCARE PRODUCTS
            </Link>
            <div className="dropdown-menu">
              <Link
                to="/products?category=skincare&subcategory=makeup"
                onClick={closeMenu}
              >
                MAKEUP
              </Link>
              <Link
                to="/products?category=skincare&subcategory=skincare-bath-body"
                onClick={closeMenu}
              >
                SKINCARE, BATH & BODY
              </Link>
              <Link
                to="/products?category=skincare&subcategory=haircare"
                onClick={closeMenu}
              >
                HAIRCARE
              </Link>
              <Link
                to="/products?category=skincare&subcategory=appliances"
                onClick={closeMenu}
              >
                APPLIANCES
              </Link>
              <Link
                to="/products?category=skincare&subcategory=fragrances"
                onClick={closeMenu}
              >
                FRAGRANCES
              </Link>
              <Link
                to="/products?category=skincare&subcategory=beauty-gift-sets"
                onClick={closeMenu}
              >
                BEAUTY GIFT SET
              </Link>
              <Link
                to="/products?category=skincare&subcategory=mens-grooming"
                onClick={closeMenu}
              >
                MENS GROOMING
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

        {/* Right Actions */}
        <div className="wm-actions">
          <Link to="/login" className="nav-link login" onClick={closeMenu}>
            LOGIN / REGISTER
          </Link>

          <Link to="/favourite" className="cart nav-link">
            <Heart onClick={() => navigate("/favourite")} />
            {wishlistCount > 0 && (
              <span className="badge wishlist-badge">{wishlistCount}</span>
            )}
          </Link>

          <Link to="/cart" className="cart nav-link">
            <ShoppingCart onClick={() => navigate("/cart")} />
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
