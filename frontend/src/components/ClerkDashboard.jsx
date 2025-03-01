// src/components/Dashboard/ClerkDashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ClerkPage from '../pages/ClerkPage';

const ClerkDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Clerk Dashboard</h1>
            <ClerkPage />
            <p>Welcome to the Clerk Dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ClerkDashboard;