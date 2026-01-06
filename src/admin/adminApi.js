const ADMIN_API = "http://localhost:8080/api/admin";
const PRODUCT_API = "http://localhost:8080/api/products"; // Use public API endpoint for JSON requests
const API_URL = "http://localhost:8080/api/products";

// Demo mode - when backend is unavailable, use localStorage
// NOTE: Set to `false` only when your backend is running and tested.
// Keeping `true` helps during submission when backend may be offline.
export const DEMO_MODE = false; // Set to false to use real backend

const authHeader = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

// If an `admin` session exists but no token was saved (demo/admin login),
// create a short-lived demo token so admin API calls succeed in the demo.
const ensureDemoTokenFromAdmin = () => {
  if (!localStorage.getItem("token") && localStorage.getItem("admin")) {
    localStorage.setItem("token", "demo-admin-token");
  }
};

const fetchOptions = (options = {}) => ({
  ...options,
  credentials: "include",
});

/**
 * Local storage fallback for demo mode
 */
const demoGetProducts = () => {
  const stored = localStorage.getItem("demo_products");
  return stored ? JSON.parse(stored) : [];
};

const demoAddProduct = (product) => {
  const products = demoGetProducts();
  const newProduct = {
    ...product,
    id: Math.max(...products.map((p) => p.id || 0), 0) + 1,
  };
  products.push(newProduct);
  localStorage.setItem("demo_products", JSON.stringify(products));
  return newProduct;
};

const demoUpdateProduct = (id, product) => {
  const products = demoGetProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    products[idx] = { ...product, id };
    localStorage.setItem("demo_products", JSON.stringify(products));
  }
  return products[idx];
};

const demoDeleteProduct = (id) => {
  let products = demoGetProducts();
  products = products.filter((p) => p.id !== id);
  localStorage.setItem("demo_products", JSON.stringify(products));
};

/**
 * Safely parse JSON response, handling HTML error pages
 */
const safeJsonParse = async (res) => {
  try {
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("[API] Non-JSON response:", contentType);
      return null;
    }

    const text = await res.text();
    if (!text) return null;

    return JSON.parse(text);
  } catch (err) {
    console.error("[API] JSON parse error:", err);
    return null;
  }
};

/**
 * Safe fetch wrapper with error handling
 */
const safeFetch = async (url, options = {}) => {
  try {
    console.log(`[API] ${options.method || "GET"} ${url}`);
    const res = await fetch(url, fetchOptions(options));

    if (!res.ok) {
      const data = await safeJsonParse(res);
      const errorMsg =
        data?.message || data?.error || res.statusText || `HTTP ${res.status}`;
      console.error(`[API] Request failed: ${res.status} ${errorMsg}`);
      throw new Error(`${res.status}: ${errorMsg}`);
    }

    const data = await safeJsonParse(res);
    console.log(`[API] Success:`, data);
    return data;
  } catch (err) {
    // Network errors (e.g. server down, CORS, DNS) often surface as TypeError: Failed to fetch
    console.error(`[API] Error:`, err && err.message ? err.message : err);
    if (
      err instanceof TypeError ||
      (err &&
        typeof err.message === "string" &&
        err.message.includes("Failed to fetch"))
    ) {
      throw new Error(
        `Network error: Failed to fetch. Is the backend running at http://localhost:8080 and allowing CORS from http://localhost:5173? Original: ${
          err.message || err
        }`
      );
    }
    throw err;
  }
};

/**
 * Check backend availability with a short timeout.
 * Returns an object { ok: boolean, status?: number, message?: string }
 */
export const isBackendAvailable = async (timeoutMs = 2500) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(
      PRODUCT_API,
      fetchOptions({
        method: "GET",
        headers: authHeader(),
        signal: controller.signal,
      })
    );
    clearTimeout(id);
    if (!res.ok)
      return { ok: false, status: res.status, message: res.statusText };
    return { ok: true };
  } catch (err) {
    clearTimeout(id);
    if (err.name === "AbortError")
      return { ok: false, message: "Request timed out" };
    return { ok: false, message: err.message || String(err) };
  }
};

/* =====================
   DASHBOARD - STATS & ORDERS
===================== */
export const getStats = async () => {
  try {
    ensureDemoTokenFromAdmin();
    const data = await safeFetch(`${ADMIN_API}/stats`, {
      headers: authHeader(),
    });
    return data || { sales: 0, orders: 0, users: 0, products: 0 };
  } catch (err) {
    console.warn("[API] getStats fallback:", err.message);
    return { sales: 0, orders: 0, users: 0, products: 0 };
  }
};

export const getOrders = async () => {
  try {
    ensureDemoTokenFromAdmin();
    const data = await safeFetch(`${ADMIN_API}/orders`, {
      headers: authHeader(),
    });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("[API] getOrders fallback:", err.message);
    return [];
  }
};

/* =====================
   PRODUCTS - ADMIN CRUD (with DEMO fallback)
===================== */
export const getProducts = async () => {
  try {
    ensureDemoTokenFromAdmin();
    const data = await safeFetch(PRODUCT_API, { headers: authHeader() });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("[API] getProducts - using DEMO mode");
    if (DEMO_MODE) {
      return demoGetProducts();
    }
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    console.debug("[API] Adding product:", product);
    // Ensure demo token exists when admin signed in via the local admin login
    ensureDemoTokenFromAdmin();

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "Unauthorized: missing token. Please login as admin before adding products."
      );
    }

    // Use FormData for file upload instead of JSON
    const formData = new FormData();

    // Add product JSON
    const productData = {
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      price: product.price,
      rating: product.rating,
    };
    formData.append("product", JSON.stringify(productData));

    // Add image file if it exists
    if (product.image instanceof File) {
      formData.append("image", product.image);
    }

    // Use fetch directly without safeFetch for FormData
    const res = await fetch(
      `${ADMIN_API}/products`,
      fetchOptions({
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
    );

    if (!res.ok) {
      const errorData = await safeJsonParse(res);
      const msg = errorData?.message || `HTTP ${res.status}`;
      if (res.status === 403) {
        throw new Error(
          `Forbidden: ${msg} — your token may be invalid or you lack permissions.`
        );
      }
      throw new Error(msg);
    }

    const data = await safeJsonParse(res);
    return data || { success: true };
  } catch (err) {
    console.error("[API] addProduct failed:", err.message);

    // DEMO MODE FALLBACK
    if (DEMO_MODE) {
      console.log("[DEMO] Adding product to localStorage");
      const result = demoAddProduct(product);
      return result;
    }

    throw new Error(
      `Failed to add product: Backend not available. Error: ${err.message}`
    );
  }
};

export const updateProduct = async (id, product) => {
  try {
    console.debug("[API] Updating product:", id, product);

    // Ensure demo token exists when admin signed in via the local admin login
    ensureDemoTokenFromAdmin();

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "Unauthorized: missing token. Please login as admin before updating products."
      );
    }

    // Use FormData for file upload instead of JSON
    const formData = new FormData();

    // Add product JSON
    const productData = {
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      price: product.price,
      rating: product.rating,
    };
    formData.append("product", JSON.stringify(productData));

    // Add image file if it exists
    if (product.image instanceof File) {
      formData.append("image", product.image);
    }

    // Use fetch directly without safeFetch for FormData
    const res = await fetch(
      `${ADMIN_API}/products/${id}`,
      fetchOptions({
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })
    );

    if (!res.ok) {
      const errorData = await safeJsonParse(res);
      const msg = errorData?.message || `HTTP ${res.status}`;
      if (res.status === 403) {
        throw new Error(
          `Forbidden: ${msg} — your token may be invalid or you lack permissions.`
        );
      }
      throw new Error(msg);
    }

    const data = await safeJsonParse(res);
    return data || { success: true };
  } catch (err) {
    console.error("[API] updateProduct failed:", err.message);

    // DEMO MODE FALLBACK
    if (DEMO_MODE) {
      console.log("[DEMO] Updating product in localStorage");
      const result = demoUpdateProduct(id, product);
      return result;
    }

    throw new Error(
      `Failed to update product: Backend not available. Error: ${err.message}`
    );
  }
};

export const deleteProduct = async (id) => {
  try {
    console.debug("[API] Deleting product:", id);
    ensureDemoTokenFromAdmin();
    const data = await safeFetch(`${PRODUCT_API}/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    });
    return data || { success: true };
  } catch (err) {
    console.error("[API] deleteProduct failed:", err.message);

    // DEMO MODE FALLBACK
    if (DEMO_MODE) {
      console.log("[DEMO] Deleting product from localStorage");
      demoDeleteProduct(id);
      return { success: true };
    }

    throw new Error(
      `Failed to delete product: Backend not available. Error: ${err.message}`
    );
  }
};

/* =====================
   LEGACY - PUBLIC API
===================== */
export const getProductById = async (id) => {
  try {
    const data = await safeFetch(`${API_URL}/${id}`);
    return data || {};
  } catch (err) {
    console.warn("[API] getProductById fallback:", err.message);
    return {};
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const data = await safeFetch(`${API_URL}/category/${category}`);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.warn("[API] getProductsByCategory fallback:", err.message);
    return [];
  }
};
