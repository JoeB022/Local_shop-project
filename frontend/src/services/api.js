console.log("API functions loaded"); // Debugging

import { API_URL } from "../config";

// Mock user data for demonstration purposes
const mockUsers = [
    { name: 'Admin User', email: 'admin@localshop.com', password: 'adminpass', role: 'admin' },
    { name: 'Clerk User', email: 'clerk@localshop.com', password: 'clerkpass', role: 'clerk' },
    { name: 'Merchant User', email: 'merchant@localshop.com', password: 'merchantpass', role: 'merchant' },
];

// Register user
export const registerUser = async (userData) => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    try {
        const response = await fetch(`${API_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the JWT token
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register user');
        }

        return await response.json(); // Return success response
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; // Rethrow for further handling
    }
};

// Register clerk
export const registerClerk = async (clerkData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/user/register_clerk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(clerkData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to register clerk');
        }

        return await response.json();
    } catch (error) {
        console.error('Error registering clerk:', error);
        throw error;
    }
};

// Login user
export const loginUser = async (userData) => {
    const user = mockUsers.find(user => user.email === userData.email && user.password === userData.password);
    if (user) {
        console.log("User logged in:", user);
        return { success: true, role: user.role };
    } else {
        return { success: false, message: 'Invalid credentials' };
    }
};

// Send reset password email
export const sendResetPasswordEmail = async (data) => {
    const { email } = data;
    const user = mockUsers.find(user => user.email === email);
    if (!user) {
        return { success: false, message: 'User not found' };
    }

    console.log(`Reset password email sent to: ${email}`);
    return { success: true, message: 'Reset password email sent successfully' };
};

// Fetch orders
export const fetchOrders = async () => {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};

// Record item details
export const recordItemDetails = async (itemDetails) => {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemDetails),
    });
    if (!response.ok) throw new Error('Failed to record item details');
    return response.json();
};

// Request supply
export const requestSupply = async (itemDetails) => {
    const response = await fetch(`${API_URL}/supply-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemDetails),
    });
    if (!response.ok) throw new Error('Failed to request supply');
    return response.json();
};

// Fetch clerks
export const fetchClerks = async () => {
    const response = await fetch(`${API_URL}/clerks`);
    if (!response.ok) throw new Error('Failed to fetch clerks');
    return response.json();
};

// Approve supply request
export const approveSupplyRequest = async (requestId) => {
    const response = await fetch(`${API_URL}/supply-request/${requestId}/approve`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to approve supply request');
    return response.json();
};

// Deactivate clerk
export const deactivateClerk = async (clerkId) => {
    const response = await fetch(`${API_URL}/clerks/${clerkId}/deactivate`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to deactivate clerk');
    return response.json();
};

// Fetch admins
export const fetchAdmins = async () => {
    const response = await fetch(`${API_URL}/admins`);
    if (!response.ok) throw new Error('Failed to fetch admins');
    return response.json();
};

// Add admin
export const addAdmin = async (email) => {
    const response = await fetch(`${API_URL}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to add admin');
    return response.json();
};

// Fetch store performance
export const fetchStorePerformance = async () => {
    const response = await fetch(`${API_URL}/store-performance`);
    if (!response.ok) throw new Error('Failed to fetch store performance');
    return response.json();
};
