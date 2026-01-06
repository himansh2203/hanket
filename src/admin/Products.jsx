import { useEffect, useState, useCallback } from "react";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  DEMO_MODE,
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
  Genz: [],
};

const emptyForm = {
  name: "",
  category: "",
  subcategory: "",
  description: "",
  price: "",
  rating: "",
  image: null,
  imageUrl: "",
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      console.log("[Products] Loading products...");
      setLoading(true);
      const data = await getProducts();
      console.log("[Products] Loaded:", data);
      setProducts(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("[Products] Error loading:", err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // defer to avoid synchronous setState inside effect
    const t = setTimeout(() => loadProducts(), 0);
    return () => clearTimeout(t);
  }, [loadProducts]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle file upload
    if (type === "file" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm({ ...form, image: file, imageUrl: event.target.result });
      };
      reader.readAsDataURL(file);
    }
    // Agar category change ho to subcategory ko reset karo
    else if (name === "category") {
      setForm({ ...form, category: value, subcategory: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!form.name.trim()) {
      alert("Product name is required!");
      return;
    }
    if (!form.category) {
      alert("Please select a category!");
      return;
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      alert("Price must be greater than 0!");
      return;
    }
    if (!form.imageUrl) {
      alert("Please upload an image!");
      return;
    }

    try {
      // Attempt to add/update via API. `adminApi` will fallback to DEMO mode if configured.

      const payload = {
        name: form.name.trim(),
        category: form.category,
        subcategory: form.subcategory,
        description: form.description.trim(),
        price: parseFloat(form.price),
        rating: form.rating ? parseFloat(form.rating) : 0,
        image: form.image, // Send the File object, not base64
      };

      console.debug("[Products] submitting payload:", payload);

      if (editId) {
        const resp = await updateProduct(editId, payload);
        console.debug("[Products] update response:", resp);
        alert("Product updated successfully!");
      } else {
        const resp = await addProduct(payload);
        console.debug("[Products] add response:", resp);
        alert("Product added successfully!");
      }

      setForm(emptyForm);
      setEditId(null);
      await loadProducts();
    } catch (error) {
      console.error("Form submission error:", error);
      alert(`Error: ${error.message || "Failed to save product"}`);
    }
  };

  const handleEdit = (product) => {
    setEditId(product.id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        await loadProducts();
      } catch (err) {
        console.error("Delete error:", err);
        alert(`Error: ${err.message}`);
      }
    }
  };

  // Selected category ke subcategories
  const availableSubcategories = form.category
    ? subCategoryMap[form.category] || []
    : [];

  if (loading) {
    return (
      <div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <h2>Products</h2>

      {DEMO_MODE ? (
        <div
          style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            padding: "12px",
            marginBottom: "20px",
            color: "#856404",
            fontSize: "14px",
          }}
        >
          <strong>📌 Demo Mode Active:</strong> Products are stored locally in
          your browser. When backend is ready, change DEMO_MODE to false in
          src/admin/adminApi.js
        </div>
      ) : null}

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

        {/* IMAGE UPLOAD */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ display: "block", marginBottom: 8 }}>
            <strong>Upload Product Image</strong>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={{ padding: "8px", width: "100%" }}
          />
          {form.imageUrl && (
            <div style={{ marginTop: 10 }}>
              <img
                src={form.imageUrl}
                alt="Preview"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  borderRadius: "4px",
                }}
              />
            </div>
          )}
        </div>
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
            <th>Image</th>
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
              <td>
                {p.imageUrl ? (
                  <img
                    src={
                      p.imageUrl.startsWith("/")
                        ? `http://localhost:8080${p.imageUrl}`
                        : p.imageUrl
                    }
                    alt={p.name}
                    style={{
                      maxWidth: "60px",
                      maxHeight: "60px",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <span style={{ color: "#999" }}>No image</span>
                )}
              </td>
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
