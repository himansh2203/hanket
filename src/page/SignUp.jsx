import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!data.name || !data.email || !data.password || !data.confirm) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("Invalid email format.");
      return;
    }
    if (data.password !== data.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (data.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await dispatch(
        signup({ name: data.name, email: data.email, password: data.password })
      ).unwrap();
      navigate("/profile");
    } catch (err) {
      setError(err || "Failed to signup");
    }
  };

  return (
    <div className="sp-wrapper">
      <div className="sp-card">
        <h2 className="sp-title">Create Account</h2>
        <p className="sp-sub">Join us and explore premium features</p>

        <form className="sp-form" onSubmit={handleSubmit}>
          <div className="sp-input-box">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
            <label>Full Name</label>
          </div>

          <div className="sp-input-box">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <label>Email Address</label>
          </div>

          <div className="sp-input-box">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <label>Create Password</label>
          </div>

          <div className="sp-input-box">
            <input
              type="password"
              name="confirm"
              value={data.confirm}
              onChange={handleChange}
              required
            />
            <label>Confirm Password</label>
          </div>

          {error && <div className="sp-error">{error}</div>}

          <button type="submit" className="sp-btn">
            Sign Up
          </button>

          <div className="sp-login-redirect">
            Already have an account?{" "}
            <span
              className="sp-login-link"
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer", color: "#bea163", fontWeight: "600" }}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
