import React, { useEffect, useState } from "react";
import "../style/Products.css";
import ProductCard from "../component/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  // 🔥 SUB CATEGORY MAP
  const subCategoryMap = {
    mens: [
      "top-wear",
      "sports-active-wear",
      "indian-festive-wear",
      "bottom-wear",
      "inner-sleepwear",
      "fashion-accessories",
      "footwear",
    ],
    womens: [
      "indian-fusion-wear",
      "lingerie-sleepwear",
      "western-wear",
      "footwear",
      "bottom-wear",
      "sports-active-wear",
      "beauty-personal-care",
      "jewellery",
    ],
    kids: [
      "boys-clothing",
      "girls-clothing",
      "footwear",
      "infants",
      "kids-accessories",
      "toys-games",
    ],
    "home-decor": [
      "handloom",
      "bath",
      "room-decor",
      "kitchen-table",
      "flooring",
      "lamps-lighting",
      "wedding-corporate-gifting",
    ],
    skincare: [
      "makeup",
      "skincare-bath-body",
      "haircare",
      "appliances",
      "fragrances",
      "beauty-gift-sets",
      "mens-grooming",
    ],
  };

  // 🔥 Fetch products from backend API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/products");
      if (!res.ok) throw new Error("Failed to fetch from backend");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("Backend unavailable, trying local JSON:", err.message);
      // Fallback to local JSON if backend is unavailable
      try {
        const res = await fetch("/data/products.json");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (fallbackErr) {
        setError("Failed to load products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Set category from query AFTER products loaded
  useEffect(() => {
    if (!products.length) return; // wait until products loaded
    const categoryFromQuery = searchParams.get("category");
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
      setSelectedSubCategory("all");
    }
  }, [products, searchParams]);

  // 🔹 Apply Filters
  useEffect(() => {
    if (!products.length) return; // wait until products loaded

    let result = [...products];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubCategory !== "all") {
      result = result.filter((p) => p.subcategory === selectedSubCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFiltered(result);
  }, [selectedCategory, selectedSubCategory, priceRange, products]);

  // 🔹 Handlers
  const handleAddToCart = (product) => {
    dispatch(addToCart({ product, qty: 1 }));
  };

  const handleAddToFavourite = (product) => {
    dispatch(addToWishlist(product));
  };

  return (
    <div className="products-page">
      <div className="filter-bar">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("all");
          }}
        >
          <option value="all">All Categories</option>
          <option value="genz">GenZ</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="kids">Kids</option>
          <option value="home-decor">Home decor</option>
          <option value="skincare">Skincare Products</option>
        </select>

        {selectedCategory !== "all" && subCategoryMap[selectedCategory] && (
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="all">All Sub Categories</option>
            {subCategoryMap[selectedCategory].map((sub, index) => (
              <option key={index} value={sub}>
                {sub.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        )}

        <div className="price-filter">
          <span>₹{priceRange[0]}</span>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="products-error">{error}</p>
      ) : (
        <div className="products-grid">
          {filtered.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            filtered.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onAddToCart={handleAddToCart}
                onAddToFavourite={handleAddToFavourite}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
