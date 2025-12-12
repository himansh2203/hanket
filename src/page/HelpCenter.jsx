import React from "react";
import "../style/HelpCenter.css";

export default function HelpCenter() {
  const categories = [
    {
      title: "Account & Security",
      desc: "Manage your account, password, and authentication settings.",
      icon: "🔐",
    },
    {
      title: "Orders & Payments",
      desc: "Learn about order tracking, payment issues, and billing details.",
      icon: "💳",
    },
    {
      title: "Shipping & Delivery",
      desc: "Understand delivery timelines, delays, and shipping policies.",
      icon: "📦",
    },
    {
      title: "Refunds & Returns",
      desc: "Get help with refunds, returns, and replacement processes.",
      icon: "↩️",
    },
    {
      title: "Technical Support",
      desc: "Fix app issues, performance problems, and error messages.",
      icon: "🛠️",
    },
    {
      title: "Policies & Guidelines",
      desc: "Read our policies, rules, and community standards.",
      icon: "📘",
    },
  ];

  return (
    <main className="phc-root">
      {/* HERO */}
      <section className="phc-hero">
        <h1 className="phc-title">Help Center</h1>
        <p className="phc-sub">
          Find answers to common questions or explore support topics.
        </p>

        {/* SEARCH BAR */}
        <div className="phc-search-box">
          <input
            type="text"
            className="phc-search-input"
            placeholder="Search for help..."
          />
          <button className="phc-search-btn">Search</button>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="phc-grid-container">
        {categories.map((cat, index) => (
          <div key={index} className="phc-card">
            <div className="phc-icon">{cat.icon}</div>
            <h3 className="phc-card-title">{cat.title}</h3>
            <p className="phc-card-desc">{cat.desc}</p>
            <button className="phc-card-btn">View Articles →</button>
          </div>
        ))}
      </section>
    </main>
  );
}
