import "../style/FeatureCategories.css";
import categories from "../data/categories";

const FeaturedCategories = () => {
  return (
    <section className="fc-section">
      <p className="fc-subtitle">WELCOME TO HANKET</p>

      <h2 className="fc-title">Featured Categories</h2>

      <p className="fc-desc">
        Discover a wide range of premium products, carefully selected for
        quality and style.Upgrade your space with collections that truly stand
        out.
      </p>

      <div className="fc-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`fc-card ${cat.size === "large" ? "fc-large" : ""}`}
          >
            <img src={cat.image} alt={cat.name} />

            <div className="fc-overlay">
              <h3>{cat.name}</h3>
              <span>{cat.productCount} Products</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
