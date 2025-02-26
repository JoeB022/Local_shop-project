import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [stockRequests, setStockRequests] = useState([]);
  const [stockReport, setStockReport] = useState([]);
  const [clerks, setClerks] = useState([]);

  // Fetch stock requests, stock report, and clerks
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("http://localhost:5000/stock/requests", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStockRequests(data);
      } else {
        alert("Failed to fetch stock requests");
      }
    };

    const fetchStockReport = async () => {
      const response = await fetch("http://localhost:5000/report/summary", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setStockReport(data);
      } else {
        alert("Failed to fetch stock report");
      }
    };

    const fetchClerks = async () => {
      const response = await fetch("http://localhost:5000/auth/clerks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.ok) {
        const data = await response.json();
        setClerks(data);
      } else {
        alert("Failed to fetch clerks");
      }
    };

    fetchRequests();
    fetchStockReport();
    fetchClerks();
  }, []);

  // Approve or Decline Stock Requests
  const handleApproval = async (stockId, status) => {
    const response = await fetch(`http://localhost:5000/stock/approve/${stockId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      alert(`Stock request ${status}!`);
      setStockRequests((prevRequests) => prevRequests.filter((req) => req.id !== stockId));
    } else {
      alert("Failed to update stock request");
    }
  };

  // Activate or Deactivate Clerk Accounts
  const handleClerkStatus = async (clerkId, action) => {
    const response = await fetch(`http://localhost:5000/auth/clerk/${action}/${clerkId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (response.ok) {
      alert(`Clerk ${action}d successfully!`);
      setClerks((prevClerks) =>
        prevClerks.map((clerk) =>
          clerk.id === clerkId ? { ...clerk, is_active: action === "activate" } : clerk
        )
      );
    } else {
      alert("Failed to update clerk status");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Stock Requests Section */}
      <h4>Pending Stock Requests</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Requested Quantity</th>
            <th>Approve</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {stockRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.product_id}</td>
              <td>{request.quantity_requested}</td>
              <td>
                <button className="btn btn-success" onClick={() => handleApproval(request.id, "approved")}>
                  Approve
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleApproval(request.id, "declined")}>
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Clerk Management Section */}
      <h4>Clerk Accounts</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Activate</th>
            <th>Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {clerks.map((clerk) => (
            <tr key={clerk.id}>
              <td>{clerk.email}</td>
              <td>{clerk.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleClerkStatus(clerk.id, "activate")}>
                  Activate
                </button>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleClerkStatus(clerk.id, "deactivate")}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stock Report Graph */}
      <h4>Stock Performance Report</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stockReport}>
          <XAxis dataKey="product_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity_in_stock" fill="#8884d8" name="Stock Quantity" />
          <Bar dataKey="quantity_sold" fill="#82ca9d" name="Sold Quantity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdminDashboard;

