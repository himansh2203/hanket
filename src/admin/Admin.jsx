// Admin.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../admin/Admin.css"; // Ensure CSS file is same folder

export default function Admin() {
  const [stats, setStats] = useState({
    sales: 0,
    orders: 0,
    users: 0,
    products: 0,
  });
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // 🔐 ADMIN AUTH CHECK
  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // 🔗 FETCH DATA (Fallback included)
  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() =>
        setStats({ sales: 10000, orders: 5, users: 20, products: 10 })
      );

    fetch("/api/admin/orders?limit=5")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() =>
        setOrders([
          { id: 1, customer: "Test Customer", status: "PAID", total: 999 },
        ])
      );
  }, []);

  // 🔓 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="ap-root">
      {/* Sidebar */}
      <aside className="ap-sidebar">
        <div className="ap-brand">Hanket Admin</div>
        <nav className="ap-nav">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/settings">Settings</Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="ap-main">
        {/* Topbar */}
        <header className="ap-topbar">
          <input className="ap-search" placeholder="Search…" />
          <div className="ap-user">
            Admin
            <button onClick={handleLogout} className="ap-logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="ap-content">
          <div className="ap-cards">
            <Card title="Total Sales" value={`₹${stats.sales}`} />
            <Card title="Orders" value={stats.orders} />
            <Card title="Users" value={stats.users} />
            <Card title="Products" value={stats.products} />
          </div>

          <h3 className="ap-section-title">Recent Orders</h3>
          <table className="ap-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.customer}</td>
                    <td>
                      <span
                        className={`ap-badge ${
                          o.status === "PAID" ? "success" : "pending"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>₹{o.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

// 🔹 CARD COMPONENT
function Card({ title, value }) {
  return (
    <div className="ap-card">
      <div className="ap-card-title">{title}</div>
      <div className="ap-card-value">{value}</div>
    </div>
  );
}
