import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN", payload: credentials });
    navigate("/"); // Redirect to Home page after login
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
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
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
          <button type="submit" className="btn btn-primary w-100">

            Login
          </button>
        </form>
        <div className="text-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google Login Success:", credentialResponse);
              // Dispatch Google login action if needed
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
