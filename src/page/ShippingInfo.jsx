import React from "react";
import "../style/ShippingInfo.css";

export default function ShippingInfo() {
  return (
    <main className="psi-root">
      {/* HERO */}
      <section className="psi-hero">
        <h1 className="psi-title">Shipping Information</h1>
        <p className="psi-sub">
          Know everything about shipping times, delivery charges, and policies.
        </p>
      </section>

      {/* SHIPPING CARDS */}
      <section className="psi-grid">
        {/* 1. Delivery Times */}
        <div className="psi-card">
          <h2 className="psi-card-title">Delivery Time Estimates</h2>
          <p className="psi-card-desc">
            We ensure fast delivery across India. Estimated delivery time
            depends on your location and product type.
          </p>
          <ul className="psi-list">
            <li>
              Metro Cities: <span>2 - 4 Days</span>
            </li>
            <li>
              Tier-1 Cities: <span>3 - 6 Days</span>
            </li>
            <li>
              Tier-2 / Rural Areas: <span>5 - 9 Days</span>
            </li>
            <li>
              Custom / Handmade Products: <span>7 - 12 Days</span>
            </li>
          </ul>
        </div>

        {/* 2. Shipping Charges */}
        <div className="psi-card">
          <h2 className="psi-card-title">Shipping Charges</h2>
          <p className="psi-card-desc">
            We keep shipping charges minimal and transparent for all customers.
          </p>
          <ul className="psi-list">
            <li>
              Orders Above ₹999: <span>Free Shipping</span>
            </li>
            <li>
              Orders Below ₹999: <span>₹49 - ₹79</span>
            </li>
            <li>
              Cash on Delivery (COD): <span>Extra ₹30</span>
            </li>
          </ul>
        </div>

        {/* 3. Order Processing */}
        <div className="psi-card">
          <h2 className="psi-card-title">Order Processing</h2>
          <p className="psi-card-desc">
            We process all orders within 24 hours (except Sundays & holidays).
          </p>
          <ul className="psi-list">
            <li>
              Order Received → <span>Packed</span>
            </li>
            <li>
              Packed → <span>Shipped in 24 hours</span>
            </li>
            <li>
              Shipped → <span>Delivery Partner Assigned</span>
            </li>
          </ul>
        </div>

        {/* 4. International Shipping */}
        <div className="psi-card">
          <h2 className="psi-card-title">International Shipping</h2>
          <p className="psi-card-desc">
            We also deliver worldwide through premium international couriers.
          </p>
          <ul className="psi-list">
            <li>
              Delivery Time: <span>7 - 15 Days</span>
            </li>
            <li>
              Shipping Fee: <span>₹999 - ₹2499</span>
            </li>
            <li>
              Custom Duties: <span>Customer Responsibility</span>
            </li>
          </ul>
        </div>

        {/* 5. Tracking Information */}
        <div className="psi-card">
          <h2 className="psi-card-title">Tracking Information</h2>
          <p className="psi-card-desc">
            Once your order is shipped, a tracking number is shared via SMS and
            email for real-time updates.
          </p>
        </div>

        {/* 6. Delivery Issues */}
        <div className="psi-card">
          <h2 className="psi-card-title">Delivery Issues</h2>
          <p className="psi-card-desc">
            If your parcel is delayed, damaged, or lost, our support team will
            help you immediately.
          </p>
          <ul className="psi-list">
            <li>Delayed Delivery</li>
            <li>Wrong Product Delivered</li>
            <li>Package Damaged</li>
            <li>Lost Shipment</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
