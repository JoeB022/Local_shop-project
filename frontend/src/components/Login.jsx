import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser , sendResetPasswordEmail } from '../services/api'; // Assuming this function exists

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState(''); // State for reset email
    const [isResetting, setIsResetting] = useState(false); // State to toggle reset form
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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await sendResetPasswordEmail({ email: resetEmail });
            if (response.success) {
                alert('Reset password email sent! Please check your inbox.');
                setIsResetting(false); // Close the reset form
                setResetEmail(''); // Clear the email input
            } else {
                alert('Failed to send reset password email. Please try again.');
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
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
                <button
                    className="reset-btn"
                    onClick={() => setIsResetting(true)} // Show reset form
                >
                    Reset Password
                </button>

                {isResetting && (
                    <form onSubmit={handleResetPassword} style={{ marginTop: '20px' }}>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="Enter your email to reset password"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="reset-btn">
                            Send Reset Link
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsResetting(false)} // Close reset form
                            style={{ marginLeft: '10px' }}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;