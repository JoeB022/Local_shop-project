// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; // Assuming this function exists

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        const response = await registerUser(userData); // Call the register function from the API service
        if (response.success) {
            alert('Registration successful!');
            navigate('/login'); // Redirect to login page after successful registration
        } else {
            alert('Registration failed: ' + response.message);
        }
    };

    return (
        <div className="auth-container"> {/* Styles the full-page background */}
            <div className="auth-box"> {/* Styles the register form container */}
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="auth-input"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="auth-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn"> {/* Reusing the styled button */}
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
