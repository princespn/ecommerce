import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../home/Header.jsx';
import Footer from '../home/Footer.jsx';

export default function Checkout() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod' // Default: Cash on Delivery
  });

  const [loading, setLoading] = useState(false);

  // Mock order items summary
  const orderItems = [
    { id: 1, name: "Premium Quality Lifestyle Item #1", price: 24.00, qty: 1 },
    { id: 2, name: "Protective Wellness Product #2", price: 45.00, qty: 2 }
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 0.00; // Free shipping
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate placing the order
    setTimeout(() => {
      setLoading(false);
      alert("🎉 Order Placed Successfully! Thank you for shopping with RiskCare.");
      navigate('/');
    }, 1500);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <main className="container-fluid py-5 flex-grow-1 px-4 px-md-5">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/cart" className="text-decoration-none">Cart</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
          </ol>
        </nav>

        <h2 className="fw-bold text-dark mb-4">Checkout</h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            
            {/* LEFT COLUMN: Shipping & Payment Information */}
            <div className="col-12 col-lg-8">
              
              {/* SECTION 1: Customer & Shipping Details */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-geo-alt text-primary fs-5"></i> 1. Shipping Address
                </h5>
                
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">First Name *</label>
                    <input 
                      type="text" name="firstName" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.firstName} onChange={handleChange} 
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">Last Name *</label>
                    <input 
                      type="text" name="lastName" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.lastName} onChange={handleChange} 
                    />
                  </div>

                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">Email Address *</label>
                    <input 
                      type="email" name="email" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.email} onChange={handleChange} 
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-secondary">Phone Number *</label>
                    <input 
                      type="tel" name="phone" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.phone} onChange={handleChange} 
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-secondary">Street Address *</label>
                    <input 
                      type="text" name="address" required 
                      placeholder="House number and street name"
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.address} onChange={handleChange} 
                    />
                  </div>

                  <div className="col-4">
                    <label className="form-label small fw-semibold text-secondary">City *</label>
                    <input 
                      type="text" name="city" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.city} onChange={handleChange} 
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label small fw-semibold text-secondary">State *</label>
                    <input 
                      type="text" name="state" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.state} onChange={handleChange} 
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label small fw-semibold text-secondary">ZIP / Postal Code *</label>
                    <input 
                      type="text" name="zip" required 
                      className="form-control shadow-none bg-light border-0 py-2" 
                      value={formData.zip} onChange={handleChange} 
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Payment Options */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-credit-card text-primary fs-5"></i> 2. Payment Method
                </h5>

                <div className="d-flex flex-column gap-3">
                  
                  {/* Cash on Delivery */}
                  <div className={`p-3 border rounded-3 cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary-subtle' : 'bg-light'}`}>
                    <div className="form-check d-flex align-items-center gap-2">
                      <input 
                        className="form-check-input mt-0" type="radio" name="paymentMethod" id="cod" value="cod" 
                        checked={formData.paymentMethod === 'cod'} onChange={handleChange} 
                      />
                      <label className="form-check-label fw-bold text-dark cursor-pointer w-100" htmlFor="cod">
                        💵 Cash on Delivery (COD)
                        <small className="d-block text-muted fw-normal">Pay with cash when your package arrives at your doorstep.</small>
                      </label>
                    </div>
                  </div>

                  {/* UPI / Digital Wallet */}
                  <div className={`p-3 border rounded-3 cursor-pointer ${formData.paymentMethod === 'upi' ? 'border-primary bg-primary-subtle' : 'bg-light'}`}>
                    <div className="form-check d-flex align-items-center gap-2">
                      <input 
                        className="form-check-input mt-0" type="radio" name="paymentMethod" id="upi" value="upi" 
                        checked={formData.paymentMethod === 'upi'} onChange={handleChange} 
                      />
                      <label className="form-check-label fw-bold text-dark cursor-pointer w-100" htmlFor="upi">
                        📱 UPI / Net Banking
                        <small className="d-block text-muted fw-normal">Pay instantly using Google Pay, PhonePe, or Paytm.</small>
                      </label>
                    </div>
                  </div>

                  {/* Credit / Debit Card */}
                  <div className={`p-3 border rounded-3 cursor-pointer ${formData.paymentMethod === 'card' ? 'border-primary bg-primary-subtle' : 'bg-light'}`}>
                    <div className="form-check d-flex align-items-center gap-2">
                      <input 
                        className="form-check-input mt-0" type="radio" name="paymentMethod" id="card" value="card" 
                        checked={formData.paymentMethod === 'card'} onChange={handleChange} 
                      />
                      <label className="form-check-label fw-bold text-dark cursor-pointer w-100" htmlFor="card">
                        💳 Credit or Debit Card
                        <small className="d-block text-muted fw-normal">Visa, Mastercard, American Express, or Discover.</small>
                      </label>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary Box */}
            <div className="col-12 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-lg-top" style={{ top: '90px' }}>
                <h5 className="fw-bold text-dark mb-3">Your Order</h5>

                {/* Items Summary list */}
                <div className="mb-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom border-light-subtle small">
                      <div>
                        <div className="fw-semibold text-dark text-truncate" style={{ maxWidth: '200px' }}>{item.name}</div>
                        <small className="text-muted">Qty: {item.qty}</small>
                      </div>
                      <span className="fw-bold text-dark">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="d-flex justify-content-between mb-2 small text-secondary">
                  <span>Subtotal</span>
                  <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 small text-secondary">
                  <span>Shipping</span>
                  <span className="text-success fw-bold">FREE</span>
                </div>

                <hr className="my-3 border-light-subtle" />

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold text-dark fs-5">Total Amount</span>
                  <span className="fw-black text-dark fs-4 font-monospace fw-bold">${total.toFixed(2)}</span>
                </div>

                {/* Submit Action */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-100 fw-bold py-3 rounded-3 shadow-sm text-white mb-3 d-flex align-items-center justify-content-center gap-2"
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : (
                    <>Place Order <i className="bi bi-check-circle-fill"></i></>
                  )}
                </button>

                <div className="text-center text-muted small d-flex align-items-center justify-content-center gap-1">
                  <i className="bi bi-shield-lock-fill text-success"></i> 256-Bit Encrypted Secure Checkout
                </div>

              </div>
            </div>

          </div>
        </form>

      </main>

      <Footer />
    </div>
  );
}