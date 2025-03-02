// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email };
        if (email === 'clerk@localshop.com') {
            login(userData);
            navigate('/clerk');
        } else if (email === 'admin@localshop.com') {
            login(userData);
            navigate('/admin');
        } else if (email === 'merchant@localshop.com') {
            login(userData);
            navigate('/merchant');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="auth-container"> {/* Styles the full-page background */}
            <div className="auth-box"> {/* Styles the login form container */}
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="auth-input" // Matches CSS for styling
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
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
