import React, { useState } from 'react';

const ProfileSettings = ({ userRole }) => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
    });

    const getRoleLabel = (role) => {
        switch (role) {
            case 'admin':
                return 'Admin';
            case 'merchant':
                return 'Merchant';
            case 'clerk':
                return 'Clerk';
            default:
                return 'User';
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Profile updated:', profile);
        alert('Profile updated successfully!');

        setProfile({ name: '', email: '', password: '' });
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Profile Settings</h1>
            <h2 style={{ textAlign: 'center', color: '#555' }}>Managing Settings for {getRoleLabel(userRole)}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: 'auto' }}>
                {['name', 'email', 'password'].map((field) => (
                    <label key={field} style={{ color: '#444', fontWeight: 'bold', display: 'flex', flexDirection: 'column' }}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={profile[field]}
                            onChange={handleInputChange}
                            placeholder={`Enter your ${field}`}
                            required
                            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '5px' }}
                        />
                    </label>
                ))}
                <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', transition: 'background 0.3s ease' }}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;
