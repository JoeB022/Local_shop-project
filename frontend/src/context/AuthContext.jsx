// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around your application
export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(() => {
        // Check local storage for existing user data
        const savedUser  = localStorage.getItem('user');
        return savedUser  ? JSON.parse(savedUser ) : null;
    });

    // Login function to set user data
    const login = (userData) => {
        setUser (userData); // userData should include both email and role
        localStorage.setItem('user', JSON.stringify(userData)); // Persist user data in local storage
    };

    // Logout function to clear user data
    const logout = () => {
        setUser (null);
        localStorage.removeItem('user'); // Clear user data from local storage
    };

    // Optional: You can add any side effects here when user state changes
    useEffect(() => {
        console.log('User  state changed:', user); // Log user state changes for debugging
    }, [user]);

    // Provide user state and authentication functions to the context
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};