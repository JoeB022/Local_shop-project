// src /components/Dashboard/AdminDashboard.js
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
        <div>
            <h1>Admin Dashboard</h1>
            <AdminPage />
            <p>Welcome to the Admin Dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;