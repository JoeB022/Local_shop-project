import React, { useState } from "react";

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate fields on change
    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character",
      }));
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value === formData.password ? "" : "Passwords do not match",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleUpdateProfile();
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/update_profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.name,
          profilePic: formData.profilePic,
          newPassword: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profile Settings</h2>
      <p>Update your personal details below:</p>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Profile Picture URL</label>
          <input
            type="text"
            name="profilePic"
            className="form-control"
            value={formData.profilePic}
            onChange={handleChange}
            placeholder="Enter profile picture URL"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSettingsPage;
