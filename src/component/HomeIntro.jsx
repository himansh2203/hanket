import "../style/HomeIntro.css";

import vitra from "../assets/vitra.png";
import magisso from "../assets/magisso.png";
import louis from "../assets/louis.png";
import klober from "../assets/klober.png";
import joseph from "../assets/joshep.jfif";
import hay from "../assets/hay.jfif";
import flos from "../assets/flo.png";
import evasolo from "../assets/eva.jfif";
import alessi from "../assets/alessi.png";

import { useNavigate } from "react-router-dom"; // ✅ correct

const brands = [
  vitra,
  magisso,
  louis,
  klober,
  joseph,
  hay,
  flos,
  evasolo,
  alessi,
];

export default function HomeIntro() {
  const navigate = useNavigate(); // ✅ hook call

  return (
    <section className="home-intro">
      <div className="home-intro-container">
        {/* LEFT CONTENT */}
        <div className="home-intro-content">
          <span className="home-intro-tag">CONDIMENTUM QUIS NASCETUR</span>

          <h1 className="home-intro-title">
            Discover fashion and style on <br /> our online worldwide store.
          </h1>

          <p className="home-intro-text">
            Explore our curated selection of the latest trends and timeless
            classics. Enjoy seamless shopping with worldwide shipping and
            exceptional customer service.
          </p>

          <div className="home-intro-actions">
            <button
              className="btn primary"
              onClick={() => navigate("/products")}
            >
              SHOP NOW
            </button>

            <button className="btn outline">VIEW MORE</button>
          </div>
        </div>

        {/* RIGHT BRAND GRID */}
        <div className="home-intro-brands">
          {brands.map((brand, index) => (
            <div key={index} className="home-intro-brand-box">
              <img src={brand} alt="brand" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
