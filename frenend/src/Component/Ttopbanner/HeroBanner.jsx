import React from 'react';
import { Link } from 'react-router-dom';

export default function PromoBanner() {
  return (
<div className="w-100 bg-dark text-white overflow-hidden position-relative shadow-sm" style={{ minHeight: '560px' }}>      
      {/* Background Decorative Gradient Radial Layer */}
      <div 
        className="position-absolute w-100 h-100 start-0 top-0 opacity-25 d-none d-md-block"
        style={{
          background: 'radial-gradient(circle at 80% 50%, var(--bs-primary) 0%, transparent 60%)',
          zIndex: 1
        }}
      ></div>

      <div className="container-fluid px-4 px-md-5 h-100 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center" style={{ minHeight: '340px' }}>
          
          {/* LEFT INTERFACE COLUMN: Texts & Navigation Action targets */}
          <div className="col-12 col-md-7 py-5 text-center text-md-start">
            
            {/* Tag alert anchor badge */}
            <span className="badge bg-primary text-white text-uppercase fw-bold px-3 py-2 rounded-pill mb-3 tracking-wider fs-7">
              🔥 Limited Time Offer
            </span>

            {/* Main Headline */}
            <h1 className="display-4 fw-black text-white mb-2 tracking-tight lh-sm">
              UP TO <span className="text-primary font-monospace fw-extrabold text-warning">80% OFF</span>
            </h1>

            {/* Targeted Context Scope Statement */}
            <h3 className="h4 fw-light text-light-50 mb-4 opacity-75">
              Refreshed Seasonal Catalogues for <span className="fw-semibold text-white border-bottom border-2 border-primary">Men</span> &amp; <span className="fw-semibold text-white border-bottom border-2 border-primary">Women</span>
            </h3>

            {/* Call To Action Buttons Track */}
            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
              <Link 
                to="/shop" 
                className="btn btn-warning btn-lg fw-bold px-4 py-3 rounded-3 shadow text-dark border-0 hover-scale transform transition"
              >
                Shop Now <i className="bi bi-arrow-right-short ms-1 fs-5 align-middle"></i>
              </Link>
              <Link 
                to="/shop/collections" 
                className="btn btn-outline-light btn-lg fw-semibold px-4 py-3 rounded-3 opacity-90"
              >
                View Collections
              </Link>
            </div>

          </div>

          {/* RIGHT VIEWPORT COLUMN: Graphical Layout Anchor */}
          <div className="col-5 d-none d-md-flex justify-content-center align-items-center position-relative h-100">
            <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: '100%', height: '300px' }}>
              
              {/* Giant Translucent Percentage Sign Background Backdrop Asset */}
              <div 
                className="position-absolute text-white-50 fw-bold user-select-none opacity-10"
                style={{ fontSize: '14rem', right: '10%', top: '0', pointerEvents: 'none' }}
              >
                80%
              </div>
              
              {/* 💡 IMAGE HOOK NOTE FOR DEVELOPMENT: 
                  Place your structural image background asset here. 
                  Example implementation:
                  <img src="/assets/promo-model.png" className="img-fluid object-fit-contain h-100 w-auto" alt="Promo models" />
              */}
              
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}