import "../style/ShopByCatogry.css";

import men from "../assets/summerMen.jfif";
import shoes from "../assets/shoes.jfif";
import bag from "../assets/bag.jfif";
import women from "../assets/women.jfif";

const categories = [
  {
    tag: "Hot list",
    title: "Summer Men's Wear",
    image: men,
  },
  {
    tag: "Category",
    title: "Fantastic Special Shoes",
    image: shoes,
  },
  {
    tag: "Women's",
    title: "Bags & Handbags",
    image: bag,
  },
  {
    tag: "Summertime",
    title: "Women's Mid-Season",
    image: women,
  },
];

export default function ShopByCategory() {
  return (
    <section className="shop-category">
      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <div className="category-image">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="category-content">
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <a href="#">SEE MORE</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
