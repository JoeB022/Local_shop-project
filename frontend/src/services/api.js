console.log("API functions loaded"); // Add this line for debugging
const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Mock user data for demonstration purposes
const mockUsers = [
    { name: 'Admin User', email: 'admin@localshop.com', password: 'adminpass', role: 'admin' },
    { name: 'Clerk User', email: 'clerk@localshop.com', password: 'clerkpass', role: 'clerk' },
    { name: 'Merchant User', email: 'merchant@localshop.com', password: 'merchantpass', role: 'merchant' },
];

// Register user
export const registerUser  = async (userData) => {
    // Check if the user already exists
    const existingUser  = mockUsers.find(user => user.email === userData.email);
    if (existingUser ) {
        return { success: false, message: 'User  already exists' }; // Return failure message
    }

    // Simulate registration by adding the user to the mockUsers array
    mockUsers.push(userData); // Add the new user to the mock data
    console.log("User  registered:", userData); // Debugging line
    return { success: true }; // Simulate a successful registration response
};

// Login user
export const loginUser  = async (userData) => {
    // Simulate a login process
    const user = mockUsers.find(user => user.email === userData.email && user.password === userData.password);
    if (user) {
        console.log("User  logged in:", user); // Debugging line
        return { success: true, role: user.role }; // Return success and user role
    } else {
        return { success: false, message: 'Invalid credentials' }; // Return failure message
    }
};

// Fetch orders
export const fetchOrders = async () => {
    const response = await fetch(`${API_URL}/orders`); // Ensure this endpoint is correct
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
};

// Record item details
export const recordItemDetails = async (itemDetails) => {
    const response = await fetch(`${API_URL}/items`, { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemDetails),
    });
    if (!response.ok) throw new Error('Failed to record item details');
    return response.json();
};

// Request supply
export const requestSupply = async (itemDetails) => {
    const response = await fetch(`${API_URL}/supply-request`, { // Adjust the endpoint as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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
        headers: {
            'Content-Type': 'application/json',
        },
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