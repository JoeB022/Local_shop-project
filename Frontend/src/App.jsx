import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './pages/ClerkDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ReportsPage from './pages/ReportsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        {/* Redirect to Home if logged in */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />

        {/* Dashboard routes remain as is */}
        <Route path="/dashboard" element={<ProtectedRoute component={user?.role === 'admin' ? AdminDashboard : ClerkDashboard} />} />
        <Route path="/reports" element={<ProtectedRoute component={ReportsPage} />} />
        <Route path="/manage-users" element={<ProtectedRoute component={ManageUsersPage} />} />
        <Route path="/profile" element={<ProtectedRoute component={ProfileSettingsPage} />} />
        <Route path="/notifications" element={<ProtectedRoute component={NotificationsPage} />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
