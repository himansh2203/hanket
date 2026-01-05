import { useEffect, useState } from "react";
import { getStats, getOrders } from "./adminApi";

const Card = ({ title, value }) => (
  <div className="ap-card">
    <div className="ap-card-title">{title}</div>
    <div className="ap-card-value">{value}</div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    sales: 0,
    orders: 0,
    users: 0,
    products: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[Dashboard] Fetching stats and orders...");

        const [statsData, ordersData] = await Promise.all([
          getStats().catch((e) => {
            console.error("[Dashboard] getStats failed:", e);
            return { sales: 0, orders: 0, users: 0, products: 0 };
          }),
          getOrders().catch((e) => {
            console.error("[Dashboard] getOrders failed:", e);
            return [];
          }),
        ]);

        console.log("[Dashboard] Stats:", statsData, "Orders:", ordersData);

        setStats(statsData || { sales: 0, orders: 0, users: 0, products: 0 });
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setError(null);
      } catch (err) {
        console.error("[Dashboard] Fatal error:", err);
        setError(err.message);
        setStats({ sales: 0, orders: 0, users: 0, products: 0 });
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="ap-content">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ap-content">
        <p style={{ color: "red" }}>Error loading dashboard: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="ap-cards">
        <Card title="Sales" value={`₹${stats?.sales || 0}`} />
        <Card title="Orders" value={stats?.orders || 0} />
        <Card title="Users" value={stats?.users || 0} />
        <Card title="Products" value={stats?.products || 0} />
      </div>

      <h3 className="ap-section-title">Recent Orders</h3>

      {orders && orders.length > 0 ? (
        <table className="ap-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer || o.user || "N/A"}</td>
                <td>
                  <span
                    className={`ap-badge ${(
                      o.status || "pending"
                    ).toLowerCase()}`}
                  >
                    {o.status || "pending"}
                  </span>
                </td>
                <td>₹{o.total || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders yet</p>
      )}
    </div>
  );
}
