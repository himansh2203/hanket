import React, { useState, useEffect } from "react";
import "../style/ImageSlider.css";
import clothes1 from "../assets/clothes1.jpg";
import clothes4 from "../assets/clothes4.jpg";

const ImageSlider = () => {
  const images = [
    clothes1,
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    clothes4,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="slider-wrapper">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} className="slider-image" src={img} alt="Banner Slide" />
        ))}
      </div>

      <div className="slider-dots">
        {images.map((_, i) => (
          <div
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
