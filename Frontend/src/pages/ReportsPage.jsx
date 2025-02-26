import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ReportsPage = () => {
  const { user } = useContext(AppContext);

  if (user.role !== "admin") {
    return (
      <div className="container mt-4">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Reports</h2>
      <p>View detailed financial and inventory reports.</p>
      <div className="alert alert-info">Feature coming soon...</div>
    </div>
  );
};

export default ReportsPage;
