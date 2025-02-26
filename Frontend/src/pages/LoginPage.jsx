import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice"; // ✅ Import Redux login action

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null); // ✅ Track login errors
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(login(data.user)); // ✅ Store user in Redux
        alert("Login successful!");

        // ✅ Redirect based on user role
        switch (data.user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "clerk":
            navigate("/clerk-dashboard");
            break;
          case "merchant":
            navigate("/merchant-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        setError(data.message || "Invalid email or password!"); // ❌ Handle backend error
      }
    } catch (error) {
      setError("Something went wrong. Please try again."); // ❌ Handle fetch errors
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
