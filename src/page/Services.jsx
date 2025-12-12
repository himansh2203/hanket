import React from "react";
import "../style/Services.css";
import {
  FaCamera,
  FaPaintBrush,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa";

const Services = () => {
  return (
    <div className="sv-root">
      {/* HEADER SECTION */}
      <section className="sv-hero">
        <h1 className="sv-title">Our Services</h1>
        <p className="sv-sub">
          We deliver professional, high-quality services that help your brand
          grow and stand out.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="sv-container">
        {/* SERVICE CARD 1 */}
        <div className="sv-card">
          <div className="sv-icon-box">📸</div>
          <h2 className="sv-card-title">Free Photo Shoot</h2>
          <p className="sv-card-desc">
            Get a professional product photoshoot absolutely free to showcase
            your products beautifully.
          </p>
        </div>

        {/* SERVICE CARD 2 */}
        <div className="sv-card">
          <div className="sv-icon-box">🎨</div>
          <h2 className="sv-card-title">Brand Identity</h2>
          <p className="sv-card-desc">
            We design logos, color palettes, and complete brand guidelines to
            give your business a unique identity.
          </p>
        </div>

        {/* SERVICE CARD 3 */}
        <div className="sv-card">
          <div className="sv-icon-box">🛒</div>
          <h2 className="sv-card-title">Marketplace Launch</h2>
          <p className="sv-card-desc">
            Launch your products on top marketplaces like Amazon, Flipkart,
            Meesho & more with complete support.
          </p>
        </div>

        {/* SERVICE CARD 4 */}
        <div className="sv-card">
          <div className="sv-icon-box">⚙️</div>
          <h2 className="sv-card-title">Hassle-Free Setup</h2>
          <p className="sv-card-desc">
            From account setup to listing creation — we handle everything so you
            can focus on your business.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;
