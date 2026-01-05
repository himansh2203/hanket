import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./adminApi";

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

const emptyForm = {
  name: "",
  category: "",
  subcategory: "",
  description: "",
  price: "",
  rating: "",
  imageUrl: "",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Agar category change ho to subcategory ko reset karo
    if (name === "category") {
      setForm({ ...form, category: value, subcategory: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateProduct(editId, form);
    } else {
      await addProduct(form);
    }

    setForm(emptyForm);
    setEditId(null);
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  // Selected category ke subcategories
  const availableSubcategories = form.category
    ? subCategoryMap[form.category] || []
    : [];

  return (
    <>
      <h2>Products</h2>

      {/* ADD / EDIT FORM */}
      <form
        onSubmit={handleSubmit}
        className="ap-card"
        style={{ marginBottom: 20 }}
      >
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* CATEGORY DROPDOWN */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {Object.keys(subCategoryMap).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>

        {/* SUBCATEGORY DROPDOWN - Sirf selected category ke subcategories */}
        <select
          name="subcategory"
          value={form.subcategory}
          onChange={handleChange}
          disabled={!form.category}
        >
          <option value="">-- Select Sub Category --</option>
          {availableSubcategories.map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat.charAt(0).toUpperCase() +
                subcat.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="rating"
          type="number"
          step="0.1"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
        />

        <button type="submit">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* PRODUCT TABLE */}
      <table className="ap-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{p.rating}</td>
              <td>
                <button onClick={() => handleEdit(p)}>✏️</button>
                <button onClick={() => handleDelete(p.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
