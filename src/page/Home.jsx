import React from "react";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";
import ProductSlider from "../component/ProductSlider";
import ImageSlider from "../component/ImageSlider";
import AdsBlock from "../component/AdsBlock";
import Offers from "../component/Offers";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <Offers />
      {/* <AdsBlock /> */}
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title" style={{ color: "#ffffff" }}>
            Discover Premium Products, <br /> Delivered to Your Doorstep
          </h1>
          <p className="hero-subtitle" style={{ color: "#ffffff" }}>
            Shop from thousands of high-quality items curated just for you.
          </p>

          <button className="hero-btn" onClick={() => navigate("products")}>
            Start Shopping
          </button>
        </div>

        {/* <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Shopping Banner"
          />
        </div> */}
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      {/* <section className="features">
        <div className="feature-card">
          <FaTruck className="feature-icon" />
          <h3>Fast Delivery</h3>
          <p>Super quick shipping on every order.</p>
        </div>

        <div className="feature-card">
          <FaShieldAlt className="feature-icon" />
          <h3>Secure Payments</h3>
          <p>100% safe and secure transactions.</p>
        </div>

        <div className="feature-card">
          <FaStar className="feature-icon" />
          <h3>Top Quality</h3>
          <p>Only verified and premium products.</p>
        </div>

        <div className="feature-card">
          <FaShoppingCart className="feature-icon" />
          <h3>Easy Shopping</h3>
          <p>Seamless experience across the platform.</p>
        </div>
      </section> */}

      {/* ---------------- CATEGORY SECTION ---------------- */}
      <section className="categories">
        <h2 className="section-title">Shop by Categories</h2>

        <div className="category-grid">
          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              alt="Electronics"
            />
            <h4>Electronics</h4>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
              alt="Fashion"
            />
            <h4>Fashion</h4>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1503602642458-232111445657"
              alt="Home Decor"
            />
            <h4>Home & Living</h4>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796"
              alt="Beauty"
            />
            <h4>Beauty</h4>
          </div>
        </div>
      </section>
      <ImageSlider />
      <ProductSlider />
    </div>
  );
};

export default Home;
