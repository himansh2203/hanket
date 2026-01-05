import { useEffect, useState } from "react";

/* ================= AUTH ================= */
const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* ================= COMPONENT ================= */
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // UI
  const [selectedOrder, setSelectedOrder] = useState(null);

  /* ================= LOAD ================= */
  useEffect(() => {
    loadOrders();
  }, [page]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?page=${page}&size=8`, {
        headers: authHeader(),
      });

      const data = await res.json();

      if (data.content) {
        setOrders(data.content);
        setTotalPages(data.totalPages);
      } else {
        setOrders(data); // fallback
        setTotalPages(1);
      }

      setFilteredOrders(data.content || data);
    } catch (e) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEARCH & FILTER ================= */
  useEffect(() => {
    let temp = [...orders];

    if (search) {
      temp = temp.filter(
        (o) =>
          o.id.toString().includes(search) ||
          o.user?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      temp = temp.filter((o) => o.status === statusFilter);
    }

    setFilteredOrders(temp);
  }, [search, statusFilter, orders]);

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id, status) => {
    if (!window.confirm(`Change status to ${status}?`)) return;

    await fetch(`/api/admin/orders/${id}/status`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ status }),
    });

    loadOrders();
  };

  /* ================= CANCEL ================= */
  const cancelOrder = async (id) => {
    const reason = prompt("Cancel reason:");
    if (!reason) return;

    await fetch(`/api/admin/orders/${id}/cancel`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify({ reason }),
    });

    loadOrders();
  };

  /* ================= STATS ================= */
  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status === "CANCELLED").length,
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2>Admin Orders</h2>

      {/* ===== DASHBOARD STATS ===== */}
      <div style={{ display: "flex", gap: 20, marginBottom: 15 }}>
        <b>Total: {stats.total}</b>
        <b>Delivered: {stats.delivered}</b>
        <b>Cancelled: {stats.cancelled}</b>
      </div>

      {/* ===== SEARCH & FILTER ===== */}
      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <input
          placeholder="Search order / user"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option>PLACED</option>
          <option>SHIPPED</option>
          <option>DELIVERED</option>
          <option>CANCELLED</option>
        </select>
      </div>

      {/* ===== TABLE ===== */}
      <table className="ap-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.user}</td>
              <td>
                <select
                  value={o.status}
                  disabled={o.status === "CANCELLED"}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                >
                  <option>PLACED</option>
                  <option>SHIPPED</option>
                  <option>DELIVERED</option>
                  <option>CANCELLED</option>
                </select>
              </td>

              <td>
                <button onClick={() => setSelectedOrder(o)}>View</button>
                {o.status === "PLACED" && (
                  <button onClick={() => cancelOrder(o.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== PAGINATION ===== */}
      <div style={{ marginTop: 15 }}>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page + 1} / {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* ===== ORDER DETAILS + TIMELINE ===== */}
      {selectedOrder && (
        <div className="modal">
          <div className="modal-box">
            <h3>Order #{selectedOrder.id}</h3>
            <p>User: {selectedOrder.user}</p>

            <h4>Status Timeline</h4>
            <ul>
              {selectedOrder.history?.map((h, i) => (
                <li key={i}>
                  {h.status} – {h.time}
                </li>
              ))}
            </ul>

            <button onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
