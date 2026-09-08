import React from 'react';

export default function TrustStrip() {
  return (
    <div className="w-100 bg-white border-bottom py-3 shadow-sm">
      <div className="container-fluid px-4 px-md-5">
        <div className="row g-3 justify-content-center align-items-center text-center">
          
          {/* Feature 1: Returns */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <i className="bi bi-arrow-counterclockwise text-primary fs-5"></i>
              </div>
              <div className="text-start">
                <h6 className="mb-0 fw-bold text-dark fs-6">7 Days Easy Return</h6>
                <small className="text-muted fs-7">No questions asked policy</small>
              </div>
            </div>
          </div>

          {/* Feature 2: Payment */}
          <div className="col-12 col-md-4 border-start-md border-end-md">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <i className="bi bi-wallet2 text-primary fs-5"></i>
              </div>
              <div className="text-start">
                <h6 className="mb-0 fw-bold text-dark fs-6">Cash on Delivery</h6>
                <small className="text-muted fs-7">Pay right at your doorstep</small>
              </div>
            </div>
          </div>

          {/* Feature 3: Pricing */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <i className="bi bi-tags text-primary fs-5"></i>
              </div>
              <div className="text-start">
                <h6 className="mb-0 fw-bold text-dark fs-6">Lowest Prices</h6>
                <small className="text-muted fs-7">Guaranteed best value online</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}