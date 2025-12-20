// adminApi.js
const API = "/api/admin";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getStats = async () => {
  const res = await fetch(`${API}/stats`, { headers: authHeader() });
  return res.json();
};

export const getOrders = async () => {
  const res = await fetch(`${API}/orders`, { headers: authHeader() });
  return res.json();
};

export const getProducts = async () => {
  const res = await fetch(`${API}/products`, { headers: authHeader() });
  return res.json();
};
