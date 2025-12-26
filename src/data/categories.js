// Import local images
import accessoriesImg from "../assets/accesories.webp";
import clothesImg from "../assets/clothes2.jpg";
import bags from "../assets/bag.jfif";

const categories = [
  {
    id: 1,
    name: "Accessories",
    image: accessoriesImg,
    productCount: 42,
    size: "large",
  },
  {
    id: 2,
    name: "Bags",
    image: bags,
    productCount: 18,
    size: "small",
  },
  {
    id: 3,
    name: "Clocks",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    productCount: 9,
    size: "small",
  },
  {
    id: 4,
    name: "Cooking",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488",
    productCount: 25,
    size: "small",
  },
  {
    id: 5,
    name: "Clothes",
    image: clothesImg,
    productCount: 12,
    size: "small",
  },
];

export default categories;
