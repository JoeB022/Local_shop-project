import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function MerchantDashboard() {
  const { user } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [storeReports, setStoreReports] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });

  // Fetch admins and store reports
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/admins", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch admins");

        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        alert(error.message);
      }
    };

    const fetchStoreReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/report/store-summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch store reports");

        const data = await response.json();
        setStoreReports(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchAdmins();
    fetchStoreReports();
  }, []);

  // Handle admin creation
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register_admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newAdmin),
      });

      if (!response.ok) throw new Error("Failed to create admin");

      alert("Admin created successfully!");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  // Activate or Deactivate Admin
  const handleAdminStatus = async (adminId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/admin/${action}/${adminId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) throw new Error(`Failed to ${action} admin`);

      alert(`Admin ${action}d successfully!`);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Merchant Dashboard</h2>

      {/* Add New Admin */}
      <form onSubmit={handleCreateAdmin} className="mb-4">
        <h4>Add New Admin</h4>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Admin Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
          required
        />
        <button type="submit" className="btn btn-primary">Add Admin</button>
      </form>

      {/* Admin Management */}
      <h4>Manage Admins</h4>
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
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.email}</td>
              <td>{admin.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleAdminStatus(admin.id, "activate")}>
                  Activate
                </button>
              </td>
              <td>
                <button className="btn btn-secondary" onClick={() => handleAdminStatus(admin.id, "deactivate")}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Store Performance Report */}
      <h4>Store Performance Report</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={storeReports}>
          <XAxis dataKey="store_name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_stock" fill="#8884d8" name="Total Stock" />
          <Bar dataKey="total_sold" fill="#82ca9d" name="Total Sold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MerchantDashboard;
