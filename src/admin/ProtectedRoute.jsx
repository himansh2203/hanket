import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute
 * @param {ReactNode} children
 * @param {"user" | "admin"} role
 */
export default function ProtectedRoute({ children, role = "user" }) {
  const [auth, setAuth] = useState(false); // default false
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isAuth = false;

    if (role === "user") {
      const token = localStorage.getItem("token");
      isAuth = !!token; // boolean
    } else if (role === "admin") {
      const adminData = localStorage.getItem("admin");
      isAuth = !!adminData; // boolean
    }

    setAuth(isAuth);
    setLoading(false);
  }, [role]);

  if (loading) return <div className="page-loader">Loading...</div>;

  return auth ? (
    children
  ) : role === "user" ? (
    <Navigate to="/login" replace />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
