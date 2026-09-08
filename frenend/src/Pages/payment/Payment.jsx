import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../home/Header.jsx';
import Footer from '../home/Footer.jsx';

export default function Payment() {
  const navigate = useNavigate();

  // Selected Payment Method Tab State
  const [activeTab, setActiveTab] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'

  // Card Form State
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: ''
  });

  // UPI State
  const [upiId, setUpiId] = useState('');

  // Processing loader state
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Order Pricing
  const orderSummary = {
    subtotal: 114.00,
    shipping: 0.00,
    discount: 10.00,
    total: 104.00
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment verification API delay
    setTimeout(() => {
      setIsProcessing(false);
      alert('🎉 Payment Successful! Your order #RC-90821 has been confirmed.');
      navigate('/');
    }, 2000);
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
            <li className="breadcrumb-item"><Link to="/checkout" className="text-decoration-none">Checkout</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Payment</li>
          </ol>
        </nav>

        <h2 className="fw-bold text-dark mb-4">Complete Payment</h2>

        <div className="row g-4">
          
          {/* LEFT COLUMN: Payment Options Accordion/Tabs */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              <h5 className="fw-bold text-dark mb-4 d-flex align-items-center gap-2">
                <i className="bi bi-shield-lock-fill text-primary fs-5"></i> Select Payment Method
              </h5>

              <div className="row g-3">
                
                {/* Payment Selection Nav Buttons */}
                <div className="col-12 col-md-4 border-end-md">
                  <div className="nav flex-column nav-pills gap-2" role="tablist">
                    
                    <button 
                      className={`nav-link text-start p-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${activeTab === 'upi' ? 'active bg-primary text-white' : 'text-secondary bg-light'}`}
                      onClick={() => setActiveTab('upi')}
                    >
                      <i className="bi bi-qr-code-scan fs-5"></i> UPI / QR Code
                    </button>

                    <button 
                      className={`nav-link text-start p-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${activeTab === 'card' ? 'active bg-primary text-white' : 'text-secondary bg-light'}`}
                      onClick={() => setActiveTab('card')}
                    >
                      <i className="bi bi-credit-card-2-front fs-5"></i> Credit / Debit Card
                    </button>

                    <button 
                      className={`nav-link text-start p-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${activeTab === 'netbanking' ? 'active bg-primary text-white' : 'text-secondary bg-light'}`}
                      onClick={() => setActiveTab('netbanking')}
                    >
                      <i className="bi bi-bank fs-5"></i> Net Banking
                    </button>

                    <button 
                      className={`nav-link text-start p-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${activeTab === 'cod' ? 'active bg-primary text-white' : 'text-secondary bg-light'}`}
                      onClick={() => setActiveTab('cod')}
                    >
                      <i className="bi bi-cash-stack fs-5"></i> Cash on Delivery
                    </button>

                  </div>
                </div>

                {/* Tab Content Display Area */}
                <div className="col-12 col-md-8 ps-md-4">
                  
                  {/* TAB 1: UPI & QR CODE */}
                  {activeTab === 'upi' && (
                    <div>
                      <h6 className="fw-bold text-dark mb-3">Pay via UPI</h6>
                      <div className="text-center p-3 border rounded-3 bg-light mb-3">
                        <div className="bg-white p-3 d-inline-block rounded-3 border shadow-sm mb-2">
                          {/* Placeholder QR Code display */}
                          <i className="bi bi-qr-code text-dark" style={{ fontSize: '7rem' }}></i>
                        </div>
                        <small className="d-block text-muted fw-semibold">Scan with Google Pay, PhonePe, or Paytm</small>
                      </div>

                      <div className="text-center text-muted small my-2">OR ENTER UPI ID</div>

                      <form onSubmit={handlePayNow}>
                        <div className="input-group mb-3">
                          <input 
                            type="text" 
                            className="form-control shadow-none" 
                            placeholder="username@upi / mobile@paytm" 
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            required
                          />
                          <button type="submit" disabled={isProcessing} className="btn btn-primary fw-bold px-4 text-white">
                            Verify &amp; Pay
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* TAB 2: CREDIT / DEBIT CARD */}
                  {activeTab === 'card' && (
                    <form onSubmit={handlePayNow}>
                      <h6 className="fw-bold text-dark mb-3">Enter Card Details</h6>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label small fw-semibold text-secondary">Card Number</label>
                          <div className="input-group">
                            <input 
                              type="text" name="cardNumber" required maxLength="19" 
                              placeholder="4532 •••• •••• 8901" 
                              className="form-control shadow-none bg-light border-0 py-2" 
                              value={cardDetails.cardNumber} onChange={handleCardChange} 
                            />
                            <span className="input-group-text bg-light border-0 text-muted"><i className="bi bi-credit-card"></i></span>
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label small fw-semibold text-secondary">Card Holder Name</label>
                          <input 
                            type="text" name="cardHolder" required 
                            placeholder="JOHN DOE" 
                            className="form-control shadow-none bg-light border-0 py-2" 
                            value={cardDetails.cardHolder} onChange={handleCardChange} 
                          />
                        </div>

                        <div className="col-6">
                          <label className="form-label small fw-semibold text-secondary">Expiry Date</label>
                          <input 
                            type="text" name="expiry" required maxLength="5" 
                            placeholder="MM/YY" 
                            className="form-control shadow-none bg-light border-0 py-2" 
                            value={cardDetails.expiry} onChange={handleCardChange} 
                          />
                        </div>

                        <div className="col-6">
                          <label className="form-label small fw-semibold text-secondary">CVV / CVC</label>
                          <input 
                            type="password" name="cvv" required maxLength="4" 
                            placeholder="•••" 
                            className="form-control shadow-none bg-light border-0 py-2" 
                            value={cardDetails.cvv} onChange={handleCardChange} 
                          />
                        </div>

                        <div className="col-12 mt-4">
                          <button type="submit" disabled={isProcessing} className="btn btn-primary w-100 fw-bold py-3 text-white rounded-3 shadow-sm">
                            {isProcessing ? <span className="spinner-border spinner-border-sm me-2"></span> : `Pay $${orderSummary.total.toFixed(2)}`}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* TAB 3: NET BANKING */}
                  {activeTab === 'netbanking' && (
                    <form onSubmit={handlePayNow}>
                      <h6 className="fw-bold text-dark mb-3">Popular Banks</h6>
                      <div className="row g-2 mb-3">
                        {['HDFC Bank', 'SBI Bank', 'ICICI Bank', 'Axis Bank'].map((bank, i) => (
                          <div className="col-6" key={i}>
                            <div className="form-check p-2 border rounded-3 bg-light">
                              <input className="form-check-input" type="radio" name="bankSelect" id={`bank-${i}`} defaultChecked={i === 0} />
                              <label className="form-check-label small fw-bold text-dark cursor-pointer ms-1" htmlFor={`bank-${i}`}>
                                {bank}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button type="submit" disabled={isProcessing} className="btn btn-primary w-100 fw-bold py-3 text-white rounded-3 shadow-sm mt-3">
                        {isProcessing ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Proceed to Net Banking'}
                      </button>
                    </form>
                  )}

                  {/* TAB 4: CASH ON DELIVERY */}
                  {activeTab === 'cod' && (
                    <form onSubmit={handlePayNow}>
                      <div className="p-3 bg-light rounded-3 border mb-3">
                        <h6 className="fw-bold text-dark mb-1">Pay with Cash on Delivery</h6>
                        <small className="text-secondary d-block">
                          Pay cash at your doorstep when your shipment arrives. No digital transaction fees apply.
                        </small>
                      </div>

                      <button type="submit" disabled={isProcessing} className="btn btn-warning w-100 fw-bold py-3 rounded-3 shadow-sm">
                        {isProcessing ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Confirm COD Order'}
                      </button>
                    </form>
                  )}

                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Summary Overview Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-lg-top" style={{ top: '90px' }}>
              <h5 className="fw-bold text-dark mb-3">Payment Summary</h5>

              <div className="d-flex justify-content-between mb-2 small text-secondary">
                <span>Items Subtotal</span>
                <span className="fw-semibold text-dark">${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small text-secondary">
                <span>Shipping Fee</span>
                <span className="text-success fw-bold">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-2 small text-success">
                <span>Applied Discount</span>
                <span className="fw-bold">-${orderSummary.discount.toFixed(2)}</span>
              </div>

              <hr className="my-3 border-light-subtle" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold text-dark fs-5">Total Payable</span>
                <span className="fw-black text-primary fs-3 font-monospace fw-bold">
                  ${orderSummary.total.toFixed(2)}
                </span>
              </div>

              <div className="bg-light p-3 rounded-3 border text-muted small d-flex gap-2">
                <i className="bi bi-shield-check text-success fs-5 flex-shrink-0"></i>
                <span>Your information is encrypted with 256-bit SSL security protocol.</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}