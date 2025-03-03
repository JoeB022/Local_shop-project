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
        <div className="clerk-dashboard">
            <div className="dashboard-header">
                <h1>Clerk Dashboard</h1>
            </div>
            <div className="dashboard-content">
                <ClerkPage />
            </div>
            <div className="dashboard-footer">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default ClerkDashboard;
