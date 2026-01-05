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
        const [statsData, ordersData] = await Promise.all([
          getStats().catch(() => ({
            sales: 0,
            orders: 0,
            users: 0,
            products: 0,
          })),
          getOrders().catch(() => []),
        ]);

        setStats(statsData);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  if (error) {
    return <p>Error loading dashboard: {error}</p>;
  }

  return (
    <>
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
    </>
  );
}
