import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/ProductSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next" onClick={onClick}>
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev" onClick={onClick}>
    <FaArrowLeft />
  </div>
);

const ProductSlider = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    swipe: true,
    draggable: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price * 80),
          image: item.image,
          rating: item.rating?.rate || 4.5,
          isNew: Math.random() < 0.3, // randomly mark some products as new
        }));
        setProducts(formatted.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <div className="product-slider-loading">Loading products...</div>;

  return (
    <div className="product-slider-container">
      <h2 className="product-slider-title">Trending Products</h2>
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                className="product-img"
                loading="lazy"
              />
              {item.isNew && <span className="product-badge">New</span>}
            </div>

            <h3 className="product-name">{item.name}</h3>
            <p className="product-price">₹{item.price}</p>

            <div className="product-rating">
              <FaStar color="#ffc107" /> <span>{item.rating}</span>
            </div>

            <button
              className="product-btn"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              View Product
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
