import React, { useEffect, useState } from "react";
import "../style/Products.css";
import ProductCard from "../component/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Fetch products from backend API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://mocki.io/v1/ceefb4ff-6863-4510-be37-c28b35540eab"
      );

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      setProducts(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    alert(`Added "${product.name}" to cart!`);
  };

  return (
    <div className="products-page">
      <h1 className="products-title">Our Products</h1>

      {loading ? (
        <div className="products-grid">
          {[...Array(6)].map((_, i) => (
            <div className="product-card skeleton" key={i}>
              <div className="product-img-box skeleton-box" />
              <div className="product-info">
                <div className="skeleton-text short" />
                <div className="skeleton-text medium" />
                <div className="skeleton-text long" />
                <div className="product-bottom">
                  <div className="skeleton-text short" />
                  <div className="skeleton-btn" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="products-error">{error}</div>
      ) : (
        <div className="products-grid">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
