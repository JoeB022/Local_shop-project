import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container my-5">
      {/* Welcome Message */}
      <header className="text-center mb-5">
        <h1>Welcome to Local Shop</h1>
        <p>Your one-stop shop for quality products at great prices.</p>
      </header>

      {/* Product Showcase */}
      <section className="mb-5">
        <h2 className="mb-3">Featured Products</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
            <img src="/images/iphone_16_pro.jpg" alt="iPhone 16 Pro" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Product 1</h5>
                <p className="card-text">$19.99</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src="/images/product2.jpg" alt="Product 2" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Product 2</h5>
                <p className="card-text">$24.99</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src="/images/product3.jpg" alt="Product 3" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Product 3</h5>
                <p className="card-text">$29.99</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-5">
        <h2 className="mb-3">Shop by Category</h2>
        <div className="d-flex justify-content-around">
          <Link to="/category/electronics" className="btn btn-primary">Electronics</Link>
          <Link to="/category/clothing" className="btn btn-primary">Clothing</Link>
          <Link to="/category/home-goods" className="btn btn-primary">Home Goods</Link>
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
