import React from "react";
import "../style/ProductCard.css";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import defaultImg from "../assets/hanket_image.ico";

const ProductCard = ({ product, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="pcard-container">
      <div className="pcard-img-box">
        <img
          src={product.image || defaultImg}
          alt={product.name || product.title}
          loading="lazy"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/250x250?text=No+Image")
          }
        />
      </div>

      <h3 className="pcard-title">{product.name || product.title}</h3>

      <p className="pcard-desc">
        {product.description
          ? product.description.length > 55
            ? product.description.slice(0, 55) + "..."
            : product.description
          : "No description available."}
      </p>

      <div className="pcard-rating">
        <FaStar />
        <span>{product.rating?.rate || 4.5}</span>
      </div>

      <div className="pcard-price-box">
        <span className="pcard-price">₹{product.price}</span>
        <span className="pcard-oldprice">₹{product.price + 500}</span>
        <span className="pcard-discount">₹500 OFF</span>
      </div>

      <button className="pcard-btn" onClick={onAddToCart}>
        <FaShoppingCart />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
