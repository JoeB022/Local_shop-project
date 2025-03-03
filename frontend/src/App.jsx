// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './components/ClerkDashboard';
import AdminDashboard from './components/AdminDashboard';
import MerchantDashboard from './components/MerchantDashboard';
import ProfileDashboard from './components/ProfileDashboard'; // Import the ProfileDashboard component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
    // Simulate user role (this should come from your authentication logic)
    const userRole = 'admin'; // Change this to 'merchant' or 'clerk' as needed

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/clerk" element={<ClerkDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/merchant" element={<MerchantDashboard />} />
                <Route path="/profile-settings" element={<ProfileDashboard userRole={userRole} />} /> {/* Updated line */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;