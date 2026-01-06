import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // First, try to authenticate with the real backend
      console.log("[AdminLogin] Attempting backend login...");
      const backendRes = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (backendRes.ok) {
        // Backend login succeeded - save the real JWT token
        const backendData = await backendRes.json();
        const realToken = backendData.token;
        console.log("[AdminLogin] Backend login success, got real JWT token");

        localStorage.setItem(
          "admin",
          JSON.stringify({
            email,
            role: "ADMIN",
            loginTime: Date.now(),
          })
        );
        localStorage.setItem("token", realToken);
        navigate("/admin", { replace: true });
        return;
      }

      // Backend login failed or unavailable - fall back to local admin.json validation
      console.warn("[AdminLogin] Backend unavailable, using local admin.json");
      const res = await fetch("/data/admins.json");
      const admins = await res.json();

      const validAdmin = admins.find(
        (a) => a.email === email && a.password === password
      );

      if (!validAdmin) {
        setError("Invalid admin credentials");
        return;
      }

      // Save local admin session with demo token for demo mode
      localStorage.setItem(
        "admin",
        JSON.stringify({
          email: validAdmin.email,
          role: "ADMIN",
          loginTime: Date.now(),
        })
      );
      localStorage.setItem("token", "demo-admin-token");
      navigate("/admin", { replace: true });
    } catch (err) {
      console.error("[AdminLogin] Error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-box" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
