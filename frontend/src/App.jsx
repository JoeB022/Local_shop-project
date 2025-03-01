// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ClerkDashboard from './components/ClerkDashboard';
import AdminDashboard from './components/AdminDashboard';
import MerchantDashboard from './components/MerchantDashboard';
import Navbar from './components/Navbar'; // Adjust the import path if necessary
import Footer from './components/Footer'; // Import the Footer component

const App = () => {
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
            </Routes>
            <Footer /> {/* Include the Footer component here */}
        </Router>
    );
};

export default App;