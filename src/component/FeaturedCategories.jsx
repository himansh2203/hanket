import "../style/FeatureCategories.css";
import categories from "../data/categories";

const FeaturedCategories = () => {
  return (
    <section className="fc-section">
      <p className="fc-subtitle">WELCOME TO WOODMART</p>

      <h2 className="fc-title">Featured Categories</h2>

      <p className="fc-desc">
        Nec sem consequat mi gravida augue augue suspendisse condimentum
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
