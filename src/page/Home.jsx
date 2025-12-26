import React from "react";
import "../style/Home.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar, FaTruck, FaShieldAlt } from "react-icons/fa";
import ProductSlider from "../component/ProductSlider";
import ImageSlider from "../component/ImageSlider";
import AdsBlock from "../component/AdsBlock";
import Offers from "../component/Offers";
import HomeIntro from "../component/HomeIntro";
import ShopByCategory from "../component/ShopByCatogry";
import FeaturedCategories from "../component/FeaturedCategories";

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
      </section>
      {/* ---------------- FEATURES SECTION ---------------- */}

      <HomeIntro />
      <ImageSlider />

      {/* ---------------- CATEGORY SECTION ---------------- */}

      <ShopByCategory />

      <FeaturedCategories />
      <ProductSlider />
    </div>
  );
};

export default Home;
