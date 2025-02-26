import React from "react";
import { useParams } from "react-router-dom";

const ClerkFunctions = () => {
  const { section } = useParams(); // Get the dynamic part from URL

  // Define content for each section
  const sections = {
    inventory: {
      title: "📦 Inventory Management",
      description: "Manage stock, update quantities, and add new items."
    },
    orders: {
      title: "🛍️ Order Processing",
      description: "View and manage customer orders."
    },
    "customer-support": {
      title: "👥 Customer Assistance",
      description: "Help customers with inquiries and complaints."
    },
    sales: {
      title: "💰 Sales & Transactions",
      description: "Track daily sales, returns, and payments."
    },
    suppliers: {
      title: "🚛 Supplier Management",
      description: "Manage supplier information and track deliveries."
    },
  };

  const selectedSection = sections[section];

  if (!selectedSection) {
    return (
      <div className="container mt-4">
        <h2>⚠️ Page Not Found</h2>
        <p>The requested section does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>{selectedSection.title}</h2>
      <p>{selectedSection.description}</p>
    </div>
  );
};

export default ClerkFunctions;
