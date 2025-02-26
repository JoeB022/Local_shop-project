import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // 🔒 Redirect to login if not authenticated
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />; // 🚫 Redirect to home if role is not authorized
  }

  return children; // ✅ Allow access
};

export default ProtectedRoute;
