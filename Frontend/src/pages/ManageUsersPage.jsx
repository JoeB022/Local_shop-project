import React, { useState } from "react";

const ManageUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Clerk" },
    { id: 3, name: "Alice Johnson", role: "Customer" }
  ]);

  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Users</h2>
      <p>Add, edit, or remove users from the system.</p>

      <div className="card p-3">
        <h5>User List</h5>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(user.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success">Add New User</button>
      </div>
    </div>
  );
};

export default ManageUsersPage;
