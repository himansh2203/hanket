import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  /**
   * 🔐 Security Guard
   * If admin token is missing (manual delete / expired),
   * force redirect to admin login
   */
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  /**
   * 🚪 Logout Handler
   */
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout from Admin Panel?"
    );

    if (!confirmLogout) return;

    // Remove ONLY admin auth
    localStorage.removeItem("admin");

    // Safety cleanup (won't affect user flow)
    localStorage.removeItem("token");

    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="ap-root">
      {/* ================= SIDEBAR ================= */}
      <aside className="ap-sidebar">
        <div className="ap-brand">Hanket Admin</div>

        <nav className="ap-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="ap-main">
        <header className="ap-topbar">
          <span>Admin Panel</span>

          <button
            type="button"
            className="ap-logout"
            onClick={handleLogout}
            aria-label="Logout admin"
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
