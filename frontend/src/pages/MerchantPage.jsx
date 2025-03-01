// src/pages/MerchantPage.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

// Mock data for admins
const mockAdmins = [
    { id: 1, name: 'Admin 1', status: 'Active' },
    { id: 2, name: 'Admin 2', status: 'Deactivated' },
];

// Mock functions to simulate API calls
const fetchAdmins = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockAdmins);
        }, 1000); // Simulate a 1 second delay
    });
};

const addAdmin = async (email) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Added admin with email:', email);
            resolve('Admin added');
        }, 500); // Simulate a 0.5 second delay
    });
};

const fetchStorePerformance = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                store1: { totalSales: 1000, totalProducts: 50, paidProducts: 30, unpaidProducts: 20 },
                store2: { totalSales: 1500, totalProducts: 70, paidProducts: 50, unpaidProducts: 20 },
            });
        }, 500); // Simulate a 0.5 second delay
    });
};

const MerchantPage = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [performanceData, setPerformanceData] = useState(null);

    useEffect(() => {
        const getAdmins = async () => {
            try {
                const data = await fetchAdmins(); // Fetch admins from the mock data
                setAdmins(data);
            } catch (error) {
                setError('Error fetching admins');
                console.error('Error fetching admins:', error);
            } finally {
                setLoading(false);
            }
        };

        getAdmins();
    }, []);

    const handleAddAdmin = async () => {
        try {
            await addAdmin(newAdminEmail); // Function to add a new admin
            alert('Admin added successfully!');
            setNewAdminEmail(''); // Clear input
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    const handleViewPerformance = async () => {
        const data = await fetchStorePerformance(); // Function to fetch store performance
        setPerformanceData(data);
        console.log('Store Performance Data:', data);
    };

    const handleDeactivateAdmin = (adminId) => {
        setAdmins(admins.map(admin =>
            admin.id === adminId ? { ...admin, status: 'Deactivated' } : admin
        ));
        alert('Admin deactivated successfully!');
    };

    const handleDeleteAdmin = (adminId) => {
        setAdmins(admins.filter(admin => admin.id !== adminId));
        alert('Admin deleted successfully!');
    };

    if (loading) return <p>Loading admins...</p>;
    if (error) return <p>{error}</p>;

    // Prepare data for the chart
    const chartData = {
        labels: Object.keys(performanceData || {}).map(store => `Store ${store}`),
        datasets: [
            {
                label: 'Total Sales',
                data: performanceData ? Object.values(performanceData).map(store => store.totalSales) : [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Paid Products',
                data: performanceData ? Object.values(performanceData).map(store => store.paidProducts) : [],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Unpaid Products',
                data: performanceData ? Object.values(performanceData).map(store => store.unpaidProducts) : [],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h1>Merchant Dashboard</h1>
            <input
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="New Admin Email"
                required
            />
            <button onClick={handleAddAdmin}>Add Admin</button>
            <h2>Manage Admins</h2>
            <ul>
                {admins.map(admin => (
                    <li key={admin.id}>
                        {admin.name} - Status: {admin.status}
                        <button onClick={() => handleDeactivateAdmin(admin.id)}>Deactivate</button>
                        <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleViewPerformance}>View Store Performance</button>
            {performanceData && (
                <div>
                    <h2>Store Performance</h2>
                    <Bar data={chartData} />
                </div>
            )}
        </div>
    );
};

export default MerchantPage;