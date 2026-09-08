import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-100 text-light-50 pt-5 pb-4 mt-auto border-top border-secondary border-opacity-25">
        <div className="row g-4">
          
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold text-white mb-3">🛡️ RiskCare </h5>
            <p className="small text-secondary lh-base mb-3">
              Organized by RiskCare Global Network Ltd. We are dedicated to delivering validated protective infrastructure, healthcare apparel, and medical consumer solutions worldwide.
            </p>
            <div className="d-flex gap-3">
              <a href="#facebook" className="text-secondary hover-white fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#twitter" className="text-secondary hover-white fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="#linkedin" className="text-secondary hover-white fs-5"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* COLUMN 2: About Us */}
          <div className="col-6 col-md-6 col-lg-3 ps-lg-5">
            <h6 className="text-white fw-bold text-uppercase tracking-wider small mb-3">About Us</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/about/company" className="text-secondary text-decoration-none hover-white">Our Story</Link></li>
              <li><Link to="/about/careers" className="text-secondary text-decoration-none hover-white">Careers</Link></li>
              <li><Link to="/supplier" className="text-secondary text-decoration-none hover-white">Become a Supplier</Link></li>
              <li><Link to="/investors" className="text-secondary text-decoration-none hover-white">Investor Relations</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-6 col-lg-3">
            <h6 className="text-white fw-bold text-uppercase tracking-wider small mb-3">Here to Help</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/help/contact" className="text-secondary text-decoration-none hover-white">Contact Support</Link></li>
              <li><Link to="/help/returns" className="text-secondary text-decoration-none hover-white">Track Returns</Link></li>
              <li><Link to="/help/shipping" className="text-secondary text-decoration-none hover-white">Shipping Info</Link></li>
              <li><Link to="/help/faqs" className="text-secondary text-decoration-none hover-white">FAQs &amp; Help Center</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <h6 className="text-white fw-bold text-uppercase tracking-wider small mb-3">Our Expert Buying Guides</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/guides/men-fit" className="text-secondary text-decoration-none hover-white">Men's Seasonal Fit Guide</Link></li>
              <li><Link to="/guides/women-trends" className="text-secondary text-decoration-none hover-white">Women's Apparel Checklists</Link></li>
              <li><Link to="/guides/fabric-care" className="text-secondary text-decoration-none hover-white">Fabric &amp; Safety Standards</Link></li>
              <li><Link to="/guides/size-chart" className="text-secondary text-decoration-none hover-white">Interactive Size Finders</Link></li>
            </ul>
          </div>

        </div>

        <hr className="bg-secondary opacity-25 my-4" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 small text-secondary">
          <p className="mb-0">&copy; 2026 RiskCare. All rights reserved.</p>
          <div className="d-flex gap-3">
            <Link to="/privacy" className="text-secondary text-decoration-none hover-white">Privacy Policy</Link>
            <Link to="/terms" className="text-secondary text-decoration-none hover-white">Terms of Service</Link>
          </div>
        </div>


   
    </footer>
  );
}