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
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // 🔥 Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // const res = await fetch(
      //   "https://mocki.io/v1/ceefb4ff-6863-4510-be37-c28b35540eab"
      // );
      const res = await fetch("/public/products.json");
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

    // price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFiltered(result);
  }, [selectedCategory, priceRange, products]);

  return (
    <div className="products-page">
      {/* <h1 className="products-title">Our Products</h1> */}

      {/* 🔥 FILTER BAR */}
      <div className="filter-bar">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="genz">GenZ</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="kids">Kids</option>
          <option value="home-decor">Home decor</option>
          <option value="skincare">Skincare Products</option>
        </select>

        {/*============== sub categiries-================================================*/}
        {/* <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="genz">GenZ</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="kids">Kids</option>
          <option value="home-decor">Home decor</option>
          <option value="skincare">Skincare Products</option>
        </select> */}
        {/*============== sub categiries-================================================*/}

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
