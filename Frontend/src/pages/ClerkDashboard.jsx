import React from "react";
import { Link, useParams } from "react-router-dom";

const ClerkDashboard = () => {
  const { section } = useParams();

  // Define available sections
  const sections = {
    inventory: {
      title: "📦 Inventory Management",
      description: "Monitor, update, and add new stock.",
    },
    orders: {
      title: "🛍️ Order Processing",
      description: "View and manage pending customer orders.",
    },
    "customer-support": {
      title: "👥 Customer Assistance",
      description: "Help customers with inquiries and complaints.",
    },
    sales: {
      title: "💰 Sales & Transactions",
      description: "Track daily sales, returns, and payments.",
    },
    suppliers: {
      title: "🚛 Supplier Management",
      description: "Track stock deliveries and supplier details.",
    },
    notifications: {
      title: "🔔 Notifications",
      description: "Stay updated with system alerts and updates.",
    },
  };

  // If a section is selected, show its details
  if (section && sections[section]) {
    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">{sections[section].title}</h2>
        <p className="text-center">{sections[section].description}</p>
        <div className="text-center">
          <Link to="/clerk-dashboard" className="btn btn-secondary">⬅ Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  // Default Clerk Dashboard Overview
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Clerk Dashboard</h2>
      <div className="row g-4">
        {Object.entries(sections).map(([key, value]) => (
          <div className="col-md-4" key={key}>
            <div className="card shadow-sm p-3">
              <h5>{value.title}</h5>
              <p>{value.description}</p>
              <Link to={`/clerk-dashboard/${key}`} className="btn btn-primary">Go to {value.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClerkDashboard;
