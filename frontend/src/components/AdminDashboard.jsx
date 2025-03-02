// src/components/Dashboard/AdminDashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="dashboard-content">
                <p>Welcome to the Admin Dashboard!</p>
                <AdminPage />
            </div>
        </div>
    );
};

export default AdminDashboard;
