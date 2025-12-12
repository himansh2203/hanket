import React, { useEffect, useState } from "react";
import "../style/OrderTracking.css";

export default function OrderTracking() {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Dummy API simulation
  const fetchOrderStatus = async (id) => {
    setLoading(true);
    setError("");
    try {
      // Simulate API call delay
      await new Promise((res) => setTimeout(res, 1000));

      // Dummy data
      const dummyOrders = {
        "ORD-987654321": {
          orderId: "ORD-987654321",
          estimatedDelivery: "15 Dec 2025",
          statusSteps: [
            { label: "Order Placed", date: "12 Dec 2025 - 9:15 AM" },
            { label: "Order Confirmed", date: "12 Dec 2025 - 9:20 AM" },
            { label: "Packed", date: "13 Dec 2025 - 11:00 AM" },
            { label: "Shipped", date: "14 Dec 2025 - 3:45 PM" },
            { label: "Out for Delivery", date: "15 Dec 2025 - 9:30 AM" },
            { label: "Delivered", date: "15 Dec 2025 - 2:05 PM" },
          ],
          currentStep: 4,
        },
        "ORD-123456789": {
          orderId: "ORD-123456789",
          estimatedDelivery: "20 Dec 2025",
          statusSteps: [
            { label: "Order Placed", date: "15 Dec 2025 - 10:00 AM" },
            { label: "Order Confirmed", date: "15 Dec 2025 - 10:15 AM" },
            { label: "Packed", date: "16 Dec 2025 - 12:00 PM" },
            { label: "Shipped", date: "17 Dec 2025 - 2:00 PM" },
            { label: "Out for Delivery", date: "19 Dec 2025 - 9:00 AM" },
            { label: "Delivered", date: "20 Dec 2025 - 1:30 PM" },
          ],
          currentStep: 2,
        },
      };

      if (!dummyOrders[id]) throw new Error("Invalid Tracking ID");

      setOrder(dummyOrders[id]);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }
    fetchOrderStatus(trackingId.trim());
  };

  return (
    <main className="pot-root">
      {/* HERO */}
      <section className="pot-hero">
        <h1 className="pot-title">Track Your Order</h1>
        <p className="pot-sub">
          Enter your tracking ID to see real-time order status.
        </p>
        <form className="pot-track-form" onSubmit={handleTrack}>
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button type="submit">Track</button>
        </form>
        {error && <p className="pot-error">{error}</p>}
      </section>

      {loading && <p className="pot-loading">Loading order details...</p>}

      {order && (
        <>
          {/* ORDER SUMMARY */}
          <section className="pot-summary">
            <div className="pot-summary-card">
              <h3 className="pot-summary-title">Order ID</h3>
              <p className="pot-summary-value">{order.orderId}</p>
            </div>
            <div className="pot-summary-card">
              <h3 className="pot-summary-title">Estimated Delivery</h3>
              <p className="pot-summary-value">{order.estimatedDelivery}</p>
            </div>
          </section>

          {/* TRACKING SECTION */}
          <section className="pot-track-container">
            {order.statusSteps.map((step, index) => (
              <div
                key={index}
                className={`pot-step ${
                  index <= order.currentStep ? "pot-done" : "pot-pending"
                }`}
              >
                <div className="pot-circle"></div>

                <div className="pot-step-content">
                  <h3 className="pot-step-title">{step.label}</h3>
                  <p className="pot-step-date">{step.date}</p>
                </div>

                {index !== order.statusSteps.length - 1 && (
                  <div className="pot-line"></div>
                )}
              </div>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
