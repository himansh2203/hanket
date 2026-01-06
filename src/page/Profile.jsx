import React, { useEffect, useState } from "react";
import "../style/Profile.css";
// import API from "../services/api"; // ← Replace with backend API
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [fieldStatus, setFieldStatus] = useState({}); // success/error per field
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated");
        setLoading(false);
        return;
      }
      const res = await axios.get("http://localhost:8080/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;
      setProfileData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || "",
        joined: data.createdAt || "",
        orders: 0,
        wishlist: 0,
      });
      setEditableData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address || "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditableData(profileData); // reset changes on cancel
    setFieldStatus({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
    setFieldStatus((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length >= 3;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "phone":
        return /^\+?\d{10,15}$/.test(value);
      default:
        return true;
    }
  };

  const handleSave = async () => {
    let valid = true;
    const newStatus = {};

    // Validate all editable fields
    ["name", "email", "phone"].forEach((key) => {
      if (!validateField(key, editableData[key])) {
        newStatus[key] = "error";
        valid = false;
      } else {
        newStatus[key] = "success";
      }
    });

    setFieldStatus(newStatus);
    if (!valid) {
      alert("Please fix errors before saving.");
      return;
    }

    try {
      // TODO: Replace with actual backend call
      // await API.put("/user/profile", editableData);
      setProfileData(editableData);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    }
  };

  if (loading) return <div className="pp-loading">Loading profile...</div>;
  if (error) return <div className="pp-error">{error}</div>;

  return (
    <div className="pp-root">
      <div className="pp-card">
        <h1 className="pp-title">My Profile</h1>

        <div className="pp-info">
          {[
            { label: "Full Name", key: "name" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Address", key: "address" },
            { label: "Joined", key: "joined", readOnly: true },
            { label: "Total Orders", key: "orders", readOnly: true },
            { label: "Wishlist Items", key: "wishlist", readOnly: true },
          ].map((field) => (
            <div className="pp-info-item" key={field.key}>
              <span className="pp-label">{field.label}:</span>
              {isEditing && !field.readOnly ? (
                <input
                  type="text"
                  name={field.key}
                  value={editableData[field.key]}
                  onChange={handleChange}
                  className={`pp-input ${
                    fieldStatus[field.key] === "error"
                      ? "pp-input-error"
                      : fieldStatus[field.key] === "success"
                      ? "pp-input-success"
                      : ""
                  }`}
                />
              ) : (
                <span className="pp-value">{profileData[field.key]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="pp-actions">
          {isEditing ? (
            <>
              <button className="pp-btn edit-btn" onClick={handleSave}>
                Save
              </button>
              <button className="pp-btn logout-btn" onClick={handleEditToggle}>
                Cancel
              </button>
            </>
          ) : (
            <button className="pp-btn edit-btn" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
          <button
            className="pp-btn logout-btn"
            onClick={() => {
              dispatch(logout());
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
