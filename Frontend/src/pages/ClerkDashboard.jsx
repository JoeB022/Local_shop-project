import React from "react";
import { Link } from "react-router-dom";

const ClerkDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Clerk Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Stock Overview</h5>
            <p>Manage and track inventory.</p>
            <Link to="/inventory" className="btn btn-primary">View Stock</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>New Orders</h5>
            <p>Manage recent customer orders.</p>
            <Link to="/orders" className="btn btn-success">View Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClerkDashboard;
