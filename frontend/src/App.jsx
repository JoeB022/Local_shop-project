// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './components/ClerkDashboard';
import AdminDashboard from './components/AdminDashboard';
import MerchantDashboard from './components/MerchantDashboard';
import ProfileDashboard from './components/ProfileDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext'; // Import your AuthContext
import './App.css';

const App = () => {
    const { user } = useAuth(); // Get the user from AuthContext
    const userRole = user ? user.role : null; // Get the role if user is logged in

    const ProtectedRoute = ({ children, allowedRoles }) => {
        return allowedRoles.includes(userRole) ? children : <Navigate to="/login" />;
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
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
                <Route path="/profile-settings" element={<ProfileDashboard userRole={userRole} />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;