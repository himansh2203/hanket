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
      // 🔥 public/admins.json se read
      const res = await fetch("/data/admins.json");
      const admins = await res.json();

      const validAdmin = admins.find(
        (a) => a.email === email && a.password === password
      );

      if (!validAdmin) {
        setError("Invalid admin credentials");
        return;
      }

      // ✅ ADMIN SESSION SAVE
      localStorage.setItem(
        "admin",
        JSON.stringify({
          email: validAdmin.email,
          role: "ADMIN",
          loginTime: Date.now(),
        })
      );

      // 🔥 REDIRECT TO ADMIN DASHBOARD
      navigate("/admin", { replace: true });
    } catch (err) {
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
