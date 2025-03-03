// src/pages/ClerkPage.jsx
import React, { useEffect, useState } from 'react';

// Mock data for orders
const mockOrders = [
    { id: 1, description: 'Order 1', status: 'Pending' },
    { id: 2, description: 'Order 2', status: 'Pending' },
];

// Mock functions to simulate API calls
const fetchOrders = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockOrders);
        }, 1000); // Simulate a 1 second delay
    });
};

const recordItemDetails = async (itemDetails) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Recorded item details:', itemDetails);
            resolve('Item details recorded');
        }, 500); // Simulate a 0.5 second delay
    });
};

const requestSupply = async (itemDetails) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Supply requested for:', itemDetails);
            resolve('Supply request sent');
        }, 500); // Simulate a 0.5 second delay
    });
};

const ClerkPage = () => {
    const [itemDetails, setItemDetails] = useState({
        itemsReceived: 0,
        paymentStatus: 'not paid',
        itemsInStock: 0,
        itemsSpoilt: 0,
        buyingPrice: 0,
        sellingPrice: 0,
    });
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchOrders(); // Fetch orders from the mock data
                setOrders(data);
            } catch (error) {
                setError('Error fetching orders');
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        getOrders();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItemDetails({ ...itemDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await recordItemDetails(itemDetails); // Function to record item details
            alert('Item details recorded successfully!');
            // Reset item details after recording
            setItemDetails({
                itemsReceived: 0,
                paymentStatus: 'not paid',
                itemsInStock: 0,
                itemsSpoilt: 0,
                buyingPrice: 0,
                sellingPrice: 0,
            });
        } catch (error) {
            console.error('Error recording item details:', error);
        }
    };

    const handleRequestSupply = async () => {
        try {
            await requestSupply(itemDetails); // Function to request supply
            alert('Supply request sent successfully!');
        } catch (error) {
            console.error('Error requesting supply:', error);
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Clerk Dashboard</h1>
            <form onSubmit={handleSubmit}>
                <h2>Add Item Details</h2>
                <label>
                    Items Received:
                    <input
                        type="number"
                        name="itemsReceived"
                        value={itemDetails.itemsReceived}
                        onChange={handleInputChange}
                        placeholder="Enter number of items received"
                        required
                    />
                </label>
                <label>
                    Payment Status:
                    <select
                        name="paymentStatus"
                        value={itemDetails.paymentStatus}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="not paid">Not Paid</option>
                        <option value="paid">Paid</option>
                    </select>
                </label>
                <label>
                    Items in Stock:
                    <input
                        type="number"
                        name="itemsInStock"
                        value={itemDetails.itemsInStock}
                        onChange={handleInputChange}
                        placeholder="Enter number of items in stock"
                        required
                    />
                </label>
                <label>
                    Items Spoilt:
                    <input
                        type="number"
                        name="itemsSpoilt"
                        value={itemDetails.itemsSpoilt}
                        onChange={handleInputChange}
                        placeholder="Enter number of items spoilt"
                        required
                    />
                </label>
                <label>
                    Buying Price:
                    <input
                        type="number"
                        name="buyingPrice"
                        value={itemDetails.buyingPrice}
                        onChange={handleInputChange}
                        placeholder="Enter buying price"
                        required
                    />
                </label>
                <label>
                    Selling Price:
                    <input
                        type="number"
                        name="sellingPrice"
                        value={itemDetails.sellingPrice}
                        onChange={handleInputChange}
                        placeholder="Enter selling price"
                        required
                    />
                </label>
                <button type="submit">Record Item</button>
            </form>
            <button onClick={handleRequestSupply}>Request Supply</button>
            <h2>Pending Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>{order.description} - Status: {order.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClerkPage;