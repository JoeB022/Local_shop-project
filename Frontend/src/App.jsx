import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ClerkDashboard from "./pages/ClerkDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReportsPage from "./pages/ReportsPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Dummy Merchant Dashboard (Replace with actual component)
const MerchantDashboard = () => <h2 className="text-center mt-4">Merchant Dashboard</h2>;

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Determine correct dashboard route based on user role
  const getDashboardRoute = () => {
    if (!isAuthenticated) return "/login"; // Redirect guests to login
    if (user?.role === "admin") return "/admin-dashboard";
    if (user?.role === "clerk") return "/clerk-dashboard";
    if (user?.role === "merchant") return "/merchant-dashboard";
    return "/dashboard"; // Default fallback
  };

  return (
    <div className="content-container flex-grow-1">
      {isAuthenticated && <Navbar />}
      <div className="app-container d-flex">
        {/* Show Sidebar only when logged in */}
        {isAuthenticated && <Sidebar />}
        <div className="container mt-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <LoginPage />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to={getDashboardRoute()} /> : <RegisterPage />} />

            {/* Dashboard Route - Redirects to the correct one */}
            <Route path="/dashboard" element={<Navigate to={getDashboardRoute()} />} />

            {/* Role-Specific Dashboards */}
            <Route path="/admin-dashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin-dashboard/:section" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />

            <Route path="/clerk-dashboard" element={<ProtectedRoute requiredRole="clerk"><ClerkDashboard /></ProtectedRoute>} />
            <Route path="/clerk-dashboard/:section" element={<ProtectedRoute requiredRole="clerk"><ClerkDashboard /></ProtectedRoute>} />

            <Route path="/merchant-dashboard" element={<ProtectedRoute requiredRole="merchant"><MerchantDashboard /></ProtectedRoute>} />

            {/* General Protected Routes (Available to any logged-in user) */}
            <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

            {/* Admin Only Routes */}
            <Route path="/manage-users" element={<ProtectedRoute requiredRole="admin"><ManageUsersPage /></ProtectedRoute>} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
