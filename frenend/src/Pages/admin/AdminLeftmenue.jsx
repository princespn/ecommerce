import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ handleLogout }) => {
  return (
    <aside 
      className="bg-dark text-white p-3 d-flex flex-column flex-shrink-0" 
      style={{ width: '260px', minHeight: '100vh', backgroundColor: '#1a1d20' }}
    >
      {/* Brand Header */}
      <div className="d-flex align-items-center gap-2 px-2 py-3 mb-3 border-bottom border-secondary border-opacity-25">
        <i className="bi bi-shield-check text-primary fs-3"></i>
        <div>
          <h6 className="fw-bold mb-0 text-white">RiskCare Control</h6>
          <small className="text-muted font-monospace" style={{ fontSize: '0.7rem' }}>
            v2.4 Admin Engine
          </small>
        </div>
      </div>

      <div className="nav nav-pills flex-column gap-1 mb-auto">
        <NavLink 
          to="/admin/dashboard"
          className={({ isActive }) => 
            `nav-link text-start py-2.5 px-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${isActive ? 'active bg-primary text-white' : 'text-secondary'}`
          }
        >
          <i className="bi bi-people fs-5"></i> Users
        </NavLink>

        <NavLink 
          to="/admin/categories"
          className={({ isActive }) => 
            `nav-link text-start py-2.5 px-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${isActive ? 'active bg-primary text-white' : 'text-secondary'}`
          }
        >
          <i className="bi bi-tags fs-5"></i> Categories
        </NavLink>

        <NavLink 
          to="/admin/products"
          className={({ isActive }) => 
            `nav-link text-start py-2.5 px-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${isActive ? 'active bg-primary text-white' : 'text-secondary'}`
          }
        >
          <i className="bi bi-grid fs-5"></i> Products
        </NavLink>

        <NavLink 
          to="/admin/orders"
          className={({ isActive }) => 
            `nav-link text-start py-2.5 px-3 fw-semibold rounded-3 d-flex align-items-center gap-2 ${isActive ? 'active bg-primary text-white' : 'text-secondary'}`
          }
        >
          <i className="bi bi-box-seam fs-5"></i> Orders
          <span className="badge bg-danger ms-auto rounded-pill">12</span>
        </NavLink>
      </div>

      <div className="pt-3 border-top border-secondary border-opacity-25">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div 
              className="bg-primary rounded-circle text-white fw-bold d-flex align-items-center justify-content-center" 
              style={{ width: '36px', height: '36px' }}
            >
              A
            </div>
            <div>
              <small className="fw-bold d-block text-white">System Admin</small>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>admin@riskcare.com</small>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="btn btn-link text-danger p-0 border-0 shadow-none" 
            title="Logout"
          >
            <i className="bi bi-box-arrow-right fs-5"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;