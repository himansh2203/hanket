import React from "react";
import "../style/ProductCard.css";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import defaultImg from "../assets/hanket_image.ico";
import { useSelector } from "react-redux";

const ProductCard = ({ product, onAddToCart, onAddToFavourite }) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // 🔥 check product already wishlisted?
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  if (!product) return null;

  return (
    <div className="pcard-container">
      {/* IMAGE */}
      <div className="pcard-img-box">
        <img
          src={product.image || defaultImg}
          alt={product.name || product.title}
          loading="lazy"
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/250x250?text=No+Image")
          }
        />
        {/* FAVORITE ICON */}
        <span
          className={`pcard-fav ${isWishlisted ? "active" : ""}`}
          onClick={() => onAddToFavourite(product)}
        >
          <FaHeart />
        </span>
      </div>

      {/* TITLE */}
      <h3 className="pcard-title">{product.name || product.title}</h3>

      {/* DESCRIPTION */}
      <p className="pcard-desc">
        {product.description
          ? product.description.length > 55
            ? product.description.slice(0, 55) + "..."
            : product.description
          : "No description available."}
      </p>

      {/* RATING */}
      <div className="pcard-rating">
        <FaStar />
        <span>{product.rating?.rate || 4.5}</span>
      </div>

      {/* PRICE */}
      <div className="pcard-price-box">
        <span className="pcard-price">₹{product.price}</span>
        <span className="pcard-oldprice">₹{product.price + 500}</span>
        <span className="pcard-discount">₹500 OFF</span>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        className="pcard-btn"
        onClick={() => onAddToCart && onAddToCart(product)}
        title="Add to Cart"
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
