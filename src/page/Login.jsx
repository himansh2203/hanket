import React, { useState } from "react";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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

    try {
      const res = await dispatch(login({ username: email, password })).unwrap();
      navigate("/profile");
    } catch (err) {
      setError(err || "Invalid credentials");
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
