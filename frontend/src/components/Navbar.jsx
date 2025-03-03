// src/components/Common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto"> {/* Center the dashboard links */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/clerk">Clerk Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/merchant">Merchant Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile-settings">Profile Settings</Link> {/* Added Profile Settings link */}
                        </li>
                    </ul>
                    <ul className="navbar-nav"> {/* Right-aligned links */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;