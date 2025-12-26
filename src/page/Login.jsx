import React, { useState, useContext } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    // Dummy login logic (replace with API)
    if (email === "test@example.com" && password === "123456") {
      login({ name: "John Doe", email, phone: "+91 9876543210" });
      navigate("/profile");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="lp-wrapper">
      <div className="lp-card">
        <h2 className="lp-title">Welcome Back</h2>
        <p className="lp-sub">Login to continue</p>

        <form className="lp-form" onSubmit={handleSubmit}>
          <div className="lp-input-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="lp-input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          {error && <div className="lp-error">{error}</div>}

          <button type="submit" className="lp-btn">
            Login
          </button>

          <a onClick={() => navigate("/forgot-password")} className="lp-forgot">
            Forgot Password?
          </a>

          <div className="lp-signup">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{
                cursor: "pointer",
                color: "#bea163",
                fontWeight: "600",
              }}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
