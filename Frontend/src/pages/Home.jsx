import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// Static products (fallback)
const staticProducts = [
  { id: 1, name: "iPhone_16_Pro", price: 1050.99, image: "/images/iphone_16_pro.jpg" },
  { id: 2, name: "Adidas_campus", price: 60.99, image: "/images/Addidas_campus.png" },
  { id: 3, name: "Starlit_PS5", price: 50.99, image: "/images/Starlit_PS5.jpeg" },
  { id: 4, name: "Sony_headphones", price: 120.50, image: "/images/Sony_headphones.png" },
  { id: 5, name: "Smart_TV", price: 499.99, image: "/images/Smart_TV.png" },
  { id: 6, name: "Gaming_laptop", price: 1500.00, image: "/images/Gaming_laptop.png" },
  { id: 7, name: "Wireless_mouse", price: 25.99, image: "/images/Wireless_mouse.png" },
  { id: 8, name: "Running_shoes", price: 89.99, image: "/images/Running_shoes.png" },
  { id: 9, name: "Smart_watch", price: 199.99, image: "/images/Smart_watch.png" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [useStatic, setUseStatic] = useState(false); // Fallback flag

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "failed") {
      setUseStatic(true); // Use static products if fetch fails
    }
  }, [status]);

  return (
    <div className="container my-5">
      <Navbar />

      {/* Welcome Message */}
      <header className="text-center mb-5">
        <h1>Welcome to Local Shop</h1>
        <p>Your one-stop shop for quality products at great prices.</p>
      </header>

      {/* Role-Based Dashboard Links */}
      <section className="text-center mb-5">
        <h2>Dashboard Access</h2>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="/merchant-dashboard" className="btn btn-primary">Merchant</Link>
          <Link to="/admin-dashboard" className="btn btn-danger">Admin</Link>
          <Link to="/clerk-dashboard" className="btn btn-info">Clerk</Link>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="mb-5">
        <h2 className="mb-3">Featured Products</h2>
        <div className="row">
          {status === "loading" ? (
            <p className="text-center">Loading products...</p>
          ) : (
            (useStatic ? staticProducts : products).map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img src={product.image} alt={product.name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-5">
        <h2>Start Shopping Now!</h2>
        <div className="mt-3">
          <Link to="/login" className="btn btn-success me-2">Login</Link>
          <Link to="/register" className="btn btn-outline-success">Register</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 bg-light">
        <p>&copy; 2025 Local Shop. All rights reserved.</p>
        <div>
          <a href="https://facebook.com" className="me-2">Facebook</a>
          <a href="https://twitter.com" className="me-2">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
