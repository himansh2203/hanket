import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const updateStatus = (id, status) => {
    fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).then(() =>
      setOrders((o) =>
        o.map((ord) => (ord.id === id ? { ...ord, status } : ord))
      )
    );
  };

  return (
    <>
      <h2>Orders</h2>

      <table className="ap-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  <option>PLACED</option>
                  <option>SHIPPED</option>
                  <option>DELIVERED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
