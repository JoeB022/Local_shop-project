import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Manage Users</h5>
            <p>Administer users and their roles.</p>
            <Link to="/manage-users" className="btn btn-warning">Manage Users</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Reports</h5>
            <p>Analyze business performance.</p>
            <Link to="/reports" className="btn btn-info">View Reports</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
