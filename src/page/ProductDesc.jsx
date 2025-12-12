import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ProductDesc.css";

const ProductDesc = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // UI state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [addAnim, setAddAnim] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const zoomRef = useRef(null);
  const mainImgRef = useRef(null);

  // ---------------------------
  // TODO: Replace this fetch with your real backend API
  // Example: fetch(`https://api.yoursite.com/products/${id}`)
  // ---------------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // // REAL API (example)
        // const res = await fetch(`https://your-backend.com/api/products/${id}`);
        // const data = await res.json();
        // setProduct(data);

        // ------- DUMMY DATA (for design) -------
        const dummy = {
          id,
          title: "Premium Men's Leather Wallet - Classic Brown",
          price: 1499,
          oldPrice: 1999,
          rating: 4.8,
          reviewsCount: 128,
          stock: 32,
          description:
            "Handcrafted genuine leather wallet with multiple compartments, durable stitching and elegant finishing. Perfect for gifting and daily use.",
          highlights: [
            "100% genuine leather",
            "6 card slots + coin pocket",
            "Slim design for front pocket carry",
            "1 year warranty on stitching",
          ],
          images: [
            "https://m.media-amazon.com/images/I/81J4OCoXm-L._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71F8dktE4OL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/81Bl5gJOeAL._SX679_.jpg",
            "https://m.media-amazon.com/images/I/71k6t6z6b6L._SX679_.jpg",
          ],
          reviews: [
            {
              id: 1,
              name: "Rohan K.",
              rating: 5,
              date: "2025-10-02",
              text: "Top quality leather, very satisfied. Fast delivery.",
            },
            {
              id: 2,
              name: "Meena P.",
              rating: 4,
              date: "2025-09-12",
              text: "Looks premium. Card slots are perfect but wish it had an RFID pocket.",
            },
          ],
        };
        // simulate network
        setTimeout(() => {
          setProduct(dummy);
          setLoading(false);
        }, 650);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Thumbnail click
  const onThumbClick = (index) => {
    setMainImgIdx(index);
  };

  // Quantity handlers
  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => Math.max(1, q - 1));

  // Add to cart animation & TODO integration
  const onAddToCart = () => {
    // TODO: Replace with real add-to-cart API / Redux action
    // Example:
    // await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId: product.id, qty })})

    setAddAnim(true);
    setTimeout(() => setAddAnim(false), 1200);
  };

  // Buy now - example wiring
  const onBuyNow = () => {
    // TODO: trigger checkout flow: add to cart then navigate to checkout with product id/qty
    onAddToCart();
    // Example navigate to checkout page with state (replace with your flow)
    setTimeout(() => navigate("/checkout"), 900);
  };

  // Image zoom - handle mouse move over main image
  const handleMouseMove = (e) => {
    if (!zoomRef.current || !mainImgRef.current) return;
    const zoom = zoomRef.current;
    const img = mainImgRef.current;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the image
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    // position background accordingly
    zoom.style.backgroundPosition = `${px}% ${py}%`;
  };

  if (loading) {
    // Skeleton loader
    return (
      <div className="pd-root pd-loading-skeleton">
        <div className="pd-left-skel" />
        <div className="pd-right-skel">
          <div className="pd-skel-line short" />
          <div className="pd-skel-line medium" />
          <div className="pd-skel-line long" />
          <div className="pd-skel-box" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-root">
        <div className="pd-error">Product not found.</div>
      </div>
    );
  }

  return (
    <div className="pd-root">
      {/* LEFT - images */}
      <div className="pd-left">
        <div
          className="pd-main-img-box"
          onMouseEnter={() => setShowZoom(true)}
          onMouseLeave={() => setShowZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={mainImgRef}
            src={product.images[mainImgIdx]}
            alt={product.title}
            className="pd-main-img"
            draggable={false}
          />
          {/* Zoom window (desktop) */}
          <div
            ref={zoomRef}
            className={`pd-zoom-window ${showZoom ? "visible" : ""}`}
            style={{ backgroundImage: `url(${product.images[mainImgIdx]})` }}
            aria-hidden
          />
        </div>

        <div className="pd-thumbs">
          {product.images.map((img, i) => (
            <button
              key={i}
              className={`pd-thumb-btn ${i === mainImgIdx ? "active" : ""}`}
              onClick={() => onThumbClick(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${product.title} ${i + 1}`}
                className="pd-thumb"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT - details */}
      <div className="pd-right">
        <h1 className="pd-title">{product.title}</h1>

        <div className="pd-meta">
          <div className="pd-rating">
            ⭐ {product.rating}{" "}
            <span className="pd-revcount">({product.reviewsCount})</span>
          </div>
          <div className={`pd-stock ${product.stock > 0 ? "in" : "out"}`}>
            {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
          </div>
        </div>

        <div className="pd-price-row">
          <div className="pd-price">₹{product.price}</div>
          <div className="pd-old-price">₹{product.oldPrice}</div>
          <div className="pd-save">
            You save ₹{product.oldPrice - product.price}
          </div>
        </div>

        <p className="pd-description">{product.description}</p>

        <ul className="pd-highlights">
          {product.highlights.map((h, idx) => (
            <li key={idx}>• {h}</li>
          ))}
        </ul>

        <div className="pd-actions">
          <div className="pd-qty">
            <button
              onClick={decQty}
              className="pd-qty-btn"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input className="pd-qty-input" value={qty} readOnly />
            <button
              onClick={incQty}
              className="pd-qty-btn"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="pd-cta">
            <button
              className={`pd-btn ${addAnim ? "pd-btn-animate" : ""}`}
              onClick={onAddToCart}
            >
              Add to Cart
            </button>
            <button className="pd-btn-outline" onClick={onBuyNow}>
              Buy Now
            </button>
          </div>
        </div>

        {/* mini success hint when addAnim */}
        {addAnim && <div className="pd-added-toast">Added to cart ✓</div>}

        {/* REVIEWS */}
        <section className="pd-reviews">
          <h3>Customer reviews</h3>
          <div className="pd-review-list">
            {product.reviews.map((r) => (
              <div className="pd-review" key={r.id}>
                <div className="pd-avatar">
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="pd-review-body">
                  <div className="pd-review-head">
                    <strong>{r.name}</strong>
                    <span className="pd-review-meta">
                      ⭐ {r.rating} • {r.date}
                    </span>
                  </div>
                  <p>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="pd-related">
          <h3>Related products</h3>
          <div className="pd-related-grid">
            {/* Dummy related products - TODO: fetch from backend */}
            {[101, 102, 103, 104].map((rid) => (
              <div
                key={rid}
                className="pd-related-card"
                onClick={() => navigate(`/product/${rid}`)}
              >
                <img
                  src={`https://picsum.photos/seed/${rid}/300/200`}
                  alt={`Related ${rid}`}
                />
                <div className="pd-related-title">Related Item {rid}</div>
                <div className="pd-related-price">₹{799 + (rid % 5) * 100}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDesc;
