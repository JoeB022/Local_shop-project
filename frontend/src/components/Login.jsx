// src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser  } from '../services/api'; // Assuming this function exists

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };

        try {
            // Call the login function from the API service
            const response = await loginUser (userData);

            if (response.success) {
                // Set user data in context
                login({ email, role: response.role }); // Set user role in context
                navigate(`/${response.role}`); // Redirect based on role
            } else {
                alert('Invalid credentials or role mismatch');
            }
        } catch (error) {
            alert('An error occurred during login: ' + error.message);
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