import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated, user } = authState || {};

  // Debugging: Log authentication state
  useEffect(() => {
    console.log("Auth State:", authState);
  }, [authState]);

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if the user lacks the required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children; // ✅ Allow access
};

export default ProtectedRoute;
