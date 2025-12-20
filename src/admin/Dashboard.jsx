import { useEffect, useState } from "react";
import { getStats, getOrders } from "./adminApi";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getOrders()])
      .then(([s, o]) => {
        setStats(s);
        setOrders(o);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <>
      <div className="ap-cards">
        <Card title="Sales" value={`₹${stats.sales}`} />
        <Card title="Orders" value={stats.orders} />
        <Card title="Users" value={stats.users} />
        <Card title="Products" value={stats.products} />
      </div>

      <h3 className="ap-section-title">Recent Orders</h3>

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
              <td>{o.customer}</td>
              <td>
                <span className={`ap-badge ${o.status.toLowerCase()}`}>
                  {o.status}
                </span>
              </td>
              <td>₹{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const Card = ({ title, value }) => (
  <div className="ap-card">
    <div className="ap-card-title">{title}</div>
    <div className="ap-card-value">{value}</div>
  </div>
);
