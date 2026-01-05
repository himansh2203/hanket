// adminApi.js
const ADMIN_API = "/api/admin";
const PRODUCT_API = "/api/admin/products";

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

/* =====================
   DASHBOARD
===================== */
export const getStats = async () => {
  try {
    const res = await fetch(`${ADMIN_API}/stats`, { headers: authHeader() });
    if (!res.ok) {
      return { sales: 0, orders: 0, users: 0, products: 0 };
    }
    return await res.json();
  } catch (err) {
    console.error("getStats error:", err);
    return { sales: 0, orders: 0, users: 0, products: 0 };
  }
};

export const getOrders = async () => {
  try {
    const res = await fetch(`${ADMIN_API}/orders`, { headers: authHeader() });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getOrders error:", err);
    return [];
  }
};

/* =====================
   PRODUCTS CRUD
===================== */
export const getProducts = async () => {
  try {
    const res = await fetch(PRODUCT_API, { headers: authHeader() });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("getProducts error:", err);
    return [];
  }
};

export const addProduct = async (product) => {
  const res = await fetch(PRODUCT_API, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${PRODUCT_API}/${id}`, {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  return fetch(`${PRODUCT_API}/${id}`, {
    method: "DELETE",
    headers: authHeader(),
  });
};
