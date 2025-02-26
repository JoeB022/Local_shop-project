import React from "react";
import { useParams, Link } from "react-router-dom";

const AdminDashboard = () => {
  const { section } = useParams(); // Get the section from the URL

  // Function to render the correct section
  const renderSection = () => {
    switch (section) {
      case "manage-users":
        return <h3>👥 Manage Users Section - Administer employees and customers.</h3>;
      case "manage-products":
        return <h3>📦 Manage Products Section - Add, update, and remove products.</h3>;
      case "reports":
        return <h3>📊 Reports Section - Analyze sales and inventory performance.</h3>;
      case "manage-orders":
        return <h3>📜 Manage Orders Section - Track and update order statuses.</h3>;
      default:
        return (
          <div className="row">
            <div className="col-md-3">
              <div className="card p-3">
                <h5>Manage Users</h5>
                <p>Administer employees and customers.</p>
                <Link to="/admin-dashboard/manage-users" className="btn btn-warning">Go to Users</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3">
                <h5>Manage Products</h5>
                <p>Add, update, and remove products.</p>
                <Link to="/admin-dashboard/manage-products" className="btn btn-primary">Go to Products</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3">
                <h5>Reports</h5>
                <p>Analyze sales and inventory performance.</p>
                <Link to="/admin-dashboard/reports" className="btn btn-info">View Reports</Link>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card p-3">
                <h5>Manage Orders</h5>
                <p>Track and update order statuses.</p>
                <Link to="/admin-dashboard/manage-orders" className="btn btn-success">Go to Orders</Link>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mt-4">
      <h2>🛠️ Admin Dashboard</h2>
      {renderSection()}
    </div>
  );
};

export default AdminDashboard;
