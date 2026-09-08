import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../home/Header.jsx';
import Footer from '../home/Footer.jsx';

export default function Cart() {
  const navigate = useNavigate();

  // Mock initial cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Quality Lifestyle Item #1",
      category: "Health Apparel",
      price: 24.00,
      originalPrice: 120.00,
      quantity: 1,
      inStock: true
    },
    {
      id: 2,
      name: "Protective Wellness Product #2",
      category: "Personal Safety",
      price: 45.00,
      originalPrice: 90.00,
      quantity: 2,
      inStock: true
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Quantity Handler
  const handleQuantityChange = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Remove Item Handler
  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Promo Code Handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'RISKCARE80') {
      setDiscount(10); // Flat $10 off
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "RISKCARE80"');
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 || cartItems.length === 0 ? 0 : 5.99;
  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <main className="container-fluid py-5 flex-grow-1 px-4 px-md-5">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
          </ol>
        </nav>

        <h2 className="fw-bold text-dark mb-4">
          Your Cart <span className="text-muted fs-5 fw-normal">({cartItems.length} items)</span>
        </h2>

        {cartItems.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="card border-0 shadow-sm p-5 text-center rounded-4 my-4">
            <div className="py-4">
              <i className="bi bi-cart-x text-muted display-1 opacity-25 mb-3 d-block"></i>
              <h4 className="fw-bold text-dark">Your cart is currently empty</h4>
              <p className="text-muted small mb-4">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/" className="btn btn-primary fw-bold px-4 py-2 rounded-3 text-white shadow-sm">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* CART CONTENT GRID */
          <div className="row g-4">
            
            {/* LEFT COLUMN: Cart Items Table/List */}
            <div className="col-12 col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 bg-white mb-3">
                
                {cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="row align-items-center py-3 g-3">
                      
                      {/* Product Thumbnail & Details */}
                      <div className="col-12 col-md-6 d-flex align-items-center gap-3">
                        <div className="bg-light rounded-3 p-3 text-center flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                          <i className="bi bi-image text-muted opacity-25 fs-2"></i>
                        </div>
                        <div>
                          <span className="badge bg-light text-primary font-monospace fw-bold mb-1" style={{ fontSize: '0.7rem' }}>
                            {item.category}
                          </span>
                          <h6 className="fw-bold text-dark mb-1 text-truncate" style={{ maxWidth: '240px' }}>
                            {item.name}
                          </h6>
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold text-dark">${item.price.toFixed(2)}</span>
                            <span className="text-muted text-decoration-line-through small">${item.originalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-6 col-md-3 d-flex justify-content-md-center">
                        <div className="input-group" style={{ maxWidth: '120px' }}>
                          <button 
                            className="btn btn-outline-secondary btn-sm shadow-none" 
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <input 
                            type="text" 
                            className="form-control form-control-sm text-center shadow-none fw-bold bg-white" 
                            value={item.quantity} 
                            readOnly 
                          />
                          <button 
                            className="btn btn-outline-secondary btn-sm shadow-none" 
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total Price & Delete Button */}
                      <div className="col-6 col-md-3 d-flex align-items-center justify-content-end gap-3">
                        <span className="fw-bold text-dark fs-6">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          className="btn btn-link text-danger p-0 border-0 shadow-none"
                          onClick={() => handleRemoveItem(item.id)}
                          title="Remove item"
                        >
                          <i className="bi bi-trash fs-5"></i>
                        </button>
                      </div>

                    </div>
                    {index < cartItems.length - 1 && <hr className="my-2 border-light-subtle" />}
                  </div>
                ))}

              </div>

              {/* Shopping Guarantee Note */}
              <div className="d-flex align-items-center gap-2 text-muted small px-2">
                <i className="bi bi-shield-check text-success fs-5"></i>
                <span>Safe &amp; Secure Checkout — 7 Days Easy Return Guarantee</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary Sidebar */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-lg-top" style={{ top: '90px' }}>
                <h5 className="fw-bold text-dark mb-4">Order Summary</h5>

                {/* Price Breakdown */}
                <div className="d-flex justify-content-between mb-2 small text-secondary">
                  <span>Subtotal</span>
                  <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2 small text-secondary">
                  <span>Estimated Shipping</span>
                  <span className="fw-semibold text-dark">
                    {shipping === 0 ? <span className="text-success fw-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {promoApplied && (
                  <div className="d-flex justify-content-between mb-2 small text-success fw-semibold">
                    <span>Discount Promo</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <hr className="my-3 border-light-subtle" />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold text-dark fs-5">Total</span>
                  <span className="fw-black text-dark fs-4 font-monospace fw-bold">${total.toFixed(2)}</span>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-4">
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control shadow-none border-light-subtle text-uppercase small" 
                      placeholder="Promo code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <button 
                      className="btn btn-outline-primary fw-semibold px-3 shadow-none" 
                      type="submit"
                      disabled={promoApplied || !promoCode.trim()}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && <small className="text-success mt-1 d-block">Code applied successfully!</small>}
                </form>

                {/* Checkout CTA */}
                <button 
                  className="btn btn-primary w-100 fw-bold py-3 rounded-3 shadow-sm text-white mb-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Proceed to Checkout <i className="bi bi-arrow-right"></i>
                </button>

                <Link to="/" className="btn btn-link w-100 text-center text-decoration-none small text-secondary fw-semibold">
                  <i className="bi bi-arrow-left me-1"></i> Continue Shopping
                </Link>

              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}