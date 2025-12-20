import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

export default function AdminLayout() {
  return (
    <div className="ap-root">
      <aside className="ap-sidebar">
        <div className="ap-brand">Hanket Admin</div>
        <nav className="ap-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </aside>

      <div className="ap-main">
        <header className="ap-topbar">
          <span>Admin Panel</span>
          <button
            className="ap-logout"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </header>

        <main className="ap-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
