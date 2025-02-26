import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

function ClerkDashboard() {
  const { user } = useContext(AuthContext);
  const [stock, setStock] = useState([]);
  const [newStock, setNewStock] = useState({
    product_id: "",
    quantity_received: "",
    buying_price: "",
    selling_price: "",
    payment_status: "unpaid",
  });

  // Fetch stock data from the backend
  useEffect(() => {
    const fetchStock = async () => {
      const response = await fetch(`http://localhost:5000/stock/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) {
        setStock(data);
      } else {
        alert("Failed to fetch stock data");
      }
    };
    fetchStock();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewStock({ ...newStock, [e.target.name]: e.target.value });
  };

  // Submit new stock entry
  const handleAddStock = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/stock/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newStock),
    });

    if (response.ok) {
      alert("Stock added successfully!");
      window.location.reload();
    } else {
      alert("Failed to add stock");
    }
  };

  // Request more supply
  const handleRequestSupply = async (stockId) => {
    const response = await fetch(`http://localhost:5000/stock/request/${stockId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (response.ok) {
      alert("Supply request sent to store admin!");
    } else {
      alert("Failed to request supply");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Clerk Dashboard</h2>

      {/* Add New Stock Form */}
      <form onSubmit={handleAddStock} className="mb-4">
        <h4>Add Stock</h4>
        <input
          type="text"
          name="product_id"
          className="form-control mb-2"
          placeholder="Product ID"
          value={newStock.product_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity_received"
          className="form-control mb-2"
          placeholder="Quantity Received"
          value={newStock.quantity_received}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="buying_price"
          className="form-control mb-2"
          placeholder="Buying Price"
          value={newStock.buying_price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="selling_price"
          className="form-control mb-2"
          placeholder="Selling Price"
          value={newStock.selling_price}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Add Stock</button>
      </form>

      {/* Display Stock List */}
      <h4>Current Stock</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Payment Status</th>
            <th>Request Supply</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item.product_id}</td>
              <td>{item.quantity_in_stock}</td>
              <td>{item.payment_status}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleRequestSupply(item.id)}>
                  Request Supply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClerkDashboard;
