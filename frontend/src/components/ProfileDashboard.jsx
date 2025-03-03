// src/components/ProfileDashboard.jsx
import React from 'react';
import ProfileSettings from '../pages/ProfileSettings'; // Adjusted import path

const ProfileDashboard = ({ userRole }) => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Profile Dashboard</h1>
            <h2>Welcome, {userRole === 'admin' ? 'Admin' : userRole === 'merchant' ? 'Merchant' : 'Clerk'}!</h2>
            <ProfileSettings userRole={userRole} />
            {/* You can add more profile-related components or features here */}
        </div>
    );
};

export default ProfileDashboard;