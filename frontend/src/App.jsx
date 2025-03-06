import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './components/ClerkDashboard';
import AdminDashboard from './components/AdminDashboard';
import MerchantDashboard from './components/MerchantDashboard';
import ProfileDashboard from './components/ProfileDashboard';
import AboutPage from './pages/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import './App.css';

const App = () => {
    const { user } = useAuth(); // Get user authentication status
    const userRole = user?.role || null; // Ensure safe access to user role

    // Wrapper for protecting routes based on user roles
    const ProtectedRoute = ({ children, allowedRoles }) => {
        if (!userRole) {
            return <Navigate to="/login" replace />;
        }
        return allowedRoles.includes(userRole) ? children : <Navigate to="/" replace />;
    };

    return (
        <Router>
            <Navbar />
            <div className="main-content"> {/* Ensures proper layout */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Protected Routes */}
                    <Route path="/clerk" element={
                        <ProtectedRoute allowedRoles={['clerk', 'admin']}>
                            <ClerkDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/merchant" element={
                        <ProtectedRoute allowedRoles={['merchant', 'admin']}>
                            <MerchantDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/profile-settings" element={
                        userRole ? <ProfileDashboard userRole={userRole} /> : <Navigate to="/login" replace />
                    } />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
