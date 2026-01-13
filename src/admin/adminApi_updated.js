// Backend API Base URL
import API_BASE_URL from "../config/apiConfig.js";
const API_URL = `${API_BASE_URL}/api/products`;

// GET - Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// GET - Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// POST - Add new product
export const addProduct = async (productData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// PUT - Update product
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

// DELETE - Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};

// GET - Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/category/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// GET - Get products by subcategory
export const getProductsBySubcategory = async (subcategory) => {
  try {
    const response = await fetch(`${API_URL}/subcategory/${subcategory}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    return [];
  }
};
