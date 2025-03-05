// src/components/Common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const Navbar = () => {
    const { user, logout } = useAuth(); // Get the user and logout function from AuthContext

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Local Shop</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto"> {/* Left-aligned links */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link> {/* About link */}
                        </li>
                        {user && user.role === 'clerk' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/clerk">Clerk Dashboard</Link>
                            </li>
                        )}
                        {user && user.role === 'admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile-settings">Profile Settings</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav"> {/* Right-aligned links */}
                        {!user ? ( // Show login/register links if not logged in
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logout}>Logout</Link> {/* Add a logout link */}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
