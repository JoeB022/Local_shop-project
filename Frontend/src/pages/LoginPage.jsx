import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice"; // ✅ Import login action

// 🔥 Mock Users (Replace with Backend API later)
const users = [
  { id: 1, email: "admin@example.com", password: "admin123", role: "admin" },
  { id: 2, email: "clerk@example.com", password: "clerk123", role: "clerk" },
];

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // ✅ Track login errors
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔍 Check if user exists
    const user = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      dispatch(login(user)); // ✅ Store user in Redux (with role)
      navigate(user.role === "admin" ? "/admin-dashboard" : "/clerk-dashboard"); // ✅ Redirect based on role
    } else {
      setError("Invalid email or password!"); // ❌ Display error
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center">Login</h3>
        {error && <p className="text-danger text-center">{error}</p>} {/* ✅ Show error if login fails */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
