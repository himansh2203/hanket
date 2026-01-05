import React, { useState } from "react";
import "../style/Order.css";

const Order = () => {
  // TEMP: localStorage se order (replace later with Redux)
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  const cancelOrder = (orderId) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: "CANCELLED" } : order
    );
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  if (orders.length === 0) {
    return <h2 className="empty-order">No orders yet 📦</h2>;
  }

  return (
    <div className="order-page">
      <h2 className="order-title">My Orders</h2>

      {orders.map((order) => {
        const orderDate = new Date(order.orderDate);
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(orderDate.getDate() + order.deliveryDays);

        return (
          <div className="order-card" key={order.id}>
            <div className="order-header">
              <span>Order ID: {order.id}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            {order.items.map((item) => (
              <div className="order-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="order-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.qty}</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))}

            <div className="order-details">
              <p>Order Date: {orderDate.toDateString()}</p>
              <p>Expected Delivery: {order.deliveryDays} days</p>
              <p>
                Delivery By: <strong>{deliveryDate.toDateString()}</strong>
              </p>
              <h3>Total: ₹{order.totalAmount}</h3>
            </div>

            {order.status === "PLACED" && (
              <button
                className="cancel-btn"
                onClick={() => cancelOrder(order.id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Order;
