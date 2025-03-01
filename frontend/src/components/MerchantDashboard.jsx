// src/components/Dashboard/MerchantDashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MerchantPage from '../pages/MerchantPage';

const MerchantDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Merchant Dashboard</h1>
            <MerchantPage />
            <p>Welcome to the Merchant Dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default MerchantDashboard;