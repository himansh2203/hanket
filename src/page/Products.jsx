import React, { useEffect, useState } from "react";
import "../style/Products.css";
import ProductCard from "../component/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]); // original data
  const [filtered, setFiltered] = useState([]); // filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);

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

  // 🔥 Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/data/products.json");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();

      setProducts(data.products || []);
      setFiltered(data.products || []);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 Apply Filters
  useEffect(() => {
    let result = [...products];

    // category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // sub category filter
    if (selectedSubCategory !== "all") {
      result = result.filter((p) => p.subcategory === selectedSubCategory);
    }

    // price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFiltered(result);
  }, [selectedCategory, selectedSubCategory, priceRange, products]);

  return (
    <div className="products-page">
      {/* 🔥 FILTER BAR */}
      <div className="filter-bar">
        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("all"); // reset sub category
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

        {/* 🔥 SUB CATEGORY */}
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

        {/* PRICE FILTER */}
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

      {/* 🔥 PRODUCTS */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="products-error">{error}</p>
      ) : (
        <div className="products-grid">
          {filtered.length === 0 ? (
            <p className="no-products">No products found</p>
          ) : (
            filtered.map((item) => <ProductCard key={item.id} product={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
