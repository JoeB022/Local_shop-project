// src/pages/HomePage.jsx
import React from 'react';
import '../App.css'; // Import the global CSS file

const HomePage = () => {
    return (
        <div className="home-container">
            <div className="content">
                <h1>Welcome to LocalShop Inventory App</h1>
                <p>Your one-stop solution for managing inventory efficiently.</p>
                <p>
                    At LocalShop, we provide a seamless experience for merchants, admins, and clerks to manage their inventory, track orders, and ensure smooth operations.
                </p>
                <p>Our platform allows you to:</p>
                <ul>
                    <li>Track inventory levels in real-time.</li>
                    <li>Manage orders and suppliers effortlessly.</li>
                    <li>Generate detailed reports to analyze performance.</li>
                    <li>Request supplies and manage procurement processes.</li>
                </ul>
                <p>
                    Join us today and take control of your inventory management! Sign up now to get started and experience the benefits of efficient inventory management.
                </p>
                <h2>About Us</h2>
                <p>
                    LocalShop was created by a dedicated team of four members:
                    Abdimalik Abdullahi and Abdimalik Omar worked on the frontend,
                    while Joe Brian and Roselyn focused on the backend.
                    Our goal was to develop a user-friendly application that simplifies inventory management for businesses of all sizes.
                </p>
                <p>
                    We believe that effective inventory management is crucial for the success of any business.
                    With LocalShop, we aim to provide tools that help businesses operate more efficiently,
                    reduce costs, and improve overall productivity.
                </p>
            </div>
        </div>
    );
};

export default HomePage;