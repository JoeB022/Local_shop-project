// src/pages/ProfileSettings.jsx
import React, { useState } from 'react';

const ProfileSettings = ({ userRole }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the updated profile to your backend
        console.log('Profile updated:', profile);
        alert('Profile updated successfully!');

        // Reset the form to empty values
        setProfile({
            name: '',
            email: '',
            password: '',
        });
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ color: '#333', textAlign: 'center' }}>Profile Settings</h1>
            <form onSubmit={handleSubmit}>
                <label style={{ color: 'black' }}> {/* Set label color to black */}
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                    />
                </label>
                <label style={{ color: 'black' }}> {/* Set label color to black */}
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />
                </label>
                <label style={{ color: 'black' }}> {/* Set label color to black */}
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                    />
                </label>
                {/* You can add role-specific fields here if needed */}
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileSettings;