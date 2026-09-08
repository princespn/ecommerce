import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../home/Header.jsx';
import Footer from '../home/Footer.jsx';

export default function ProductDetail() {
  const { id } = useParams(); // Fetches product ID from the route path: /product/:id
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <main className="container py-5 flex-grow-1">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/shop" className="text-decoration-none">Products</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Product #{id}</li>
          </ol>
        </nav>

        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
          <div className="row g-5">
            
            {/* Left Column: Image Preview */}
            <div className="col-12 col-md-6 text-center">
              <div className="bg-light rounded-4 p-5 d-flex align-items-center justify-content-center" style={{ minHeight: '380px' }}>
                <i className="bi bi-image text-muted opacity-25 display-1"></i>
              </div>
            </div>

            {/* Right Column: Details & Order Controls */}
            <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
              <span className="badge bg-primary-subtle text-primary fw-bold text-uppercase w-auto mb-2 align-self-start px-3 py-2 rounded-pill">
                In Stock
              </span>
              
              <h2 className="fw-bold text-dark mb-2">Premium Quality Lifestyle Item #{id}</h2>
              <p className="text-muted small mb-3">SKU: RC-{id}0094 | Category: Health Apparel</p>

              <div className="d-flex align-items-center gap-3 mb-4">
                <h3 className="fw-bold text-dark mb-0">$24.00</h3>
                <span className="text-muted text-decoration-line-through fs-5">$120.00</span>
                <span className="badge bg-danger fw-bold">-80% OFF</span>
              </div>

              <p className="text-secondary lh-base mb-4">
                Designed for ultimate reliability and comfort. Built using validated high-grade materials to meet safety standards. Features long-lasting durability and stylish modern finish.
              </p>

              {/* Quantity Counter */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="fw-semibold text-secondary">Quantity:</span>
                <div className="input-group" style={{ maxWidth: '130px' }}>
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    className="form-control text-center shadow-none fw-bold" 
                    value={quantity} 
                    readOnly 
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="d-flex gap-3">
                <button className="btn btn-primary btn-lg fw-bold px-4 rounded-3 shadow-sm flex-grow-1 text-white">
                  <i className="bi bi-cart-plus me-2"></i> Add to Cart
                </button>
                <button className="btn btn-warning btn-lg fw-bold px-4 rounded-3 shadow-sm flex-grow-1">
                  Buy Now
                </button>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}