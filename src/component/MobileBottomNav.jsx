import { NavLink } from "react-router-dom";
import { Home, Search, ShoppingCart, Package, User } from "lucide-react";
import "../style/MobileBottomNav.css";

export default function MobileBottomNav() {
  return (
    <nav className="mbn-root">
      <NavLink to="/" className="mbn-item">
        <Home size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/search" className="mbn-item">
        <Search size={22} />
        <span>Search</span>
      </NavLink>

      <NavLink to="/cart" className="mbn-item">
        <ShoppingCart size={22} />
        <span>Cart</span>
      </NavLink>

      <NavLink to="/orders" className="mbn-item">
        <Package size={22} />
        <span>Orders</span>
      </NavLink>

      <NavLink to="/profile" className="mbn-item">
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
