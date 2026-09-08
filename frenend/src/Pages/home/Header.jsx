import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryMenu from '../../Component/CategoryMenu.jsx';

import LoginModal from '../../Component/Auth/LoginModal.jsx';   
import SignupModal from '../../Component/Auth/SignupModal.jsx'; 


export default function Header() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const isExistingUser = localStorage.getItem('isExistingUser') === 'true';

  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  
  const [cartCount] = useState(3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirects user to your application search route with URL parameters
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/');
    window.location.reload(); 
    };

  const openDefaultAuthFlow = () => {
    setShowDropdown(false);
    if (isExistingUser) {
      setIsLoginOpen(true);
    } else {
      setIsSignupOpen(true);
    }
  };

  return (
    <div className="sticky-top w-100 m-0 p-0 bg-white border-bottom shadow-sm">
      
      {/* PRIMARY MAIN NAVBAR */}
      <nav className="navbar navbar-light bg-white w-100 m-0 p-0" style={{ minHeight: '75px' }}>
        <div className="w-100 d-flex align-items-center justify-content-between mx-0 px-4 flex-wrap flex-lg-nowrap">
          
          {/* Brand Logo */}
          <div className="d-flex align-items-center">
            <Link to="/" className="navbar-brand fw-bold text-primary fs-3 m-0 p-0 me-4">
              🛡️ RiskCare
            </Link>
          </div>

          {/* 🔍 SEARCH BAR COMPONENT */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-grow-1 mx-lg-5 my-2 my-lg-0 order-3 order-lg-2" 
            style={{ maxWidth: '600px', width: '100%' }}
          >
            <div className="input-group bg-light border rounded-3 px-2 py-1 align-items-center">
              <span className="bg-transparent border-0 text-muted ps-2">
                <i className="bi bi-search fs-5"></i>
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-0 shadow-none text-dark py-2 fs-6"
                placeholder="Search for items, health products or services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="btn bg-transparent border-0 text-muted p-0 pe-2 shadow-none"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              )}
            </div>
          </form>

          <div className="d-flex align-items-center gap-4 order-2 order-lg-3 ms-auto ms-lg-0">
            <div className="d-none d-md-flex align-items-center gap-4 me-2">
              <Link to="/supplier" className="text-decoration-none fw-semibold text-secondary fs-6">Become a Supplier</Link>
              <div className="vr d-none d-md-block opacity-25" style={{ height: '30px' }}></div>
              <Link to="/investors" className="text-decoration-none fw-semibold text-secondary fs-6">Investor Relations</Link>
              <div className="vr d-none d-md-block opacity-25" style={{ height: '30px' }}></div>
            </div>          

            {/* 👤 PROFILE DROPDOWN WRAPPER */}
            <div 
              className="dropdown position-relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button 
                className="btn border-0 p-0 bg-transparent d-flex flex-column align-items-center gap-1 shadow-none text-secondary" 
                type="button" 
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <i className="bi bi-person fs-3 lh-1"></i>
                <span className="fs-7 fw-semibold d-none d-lg-inline">Profile</span>
              </button>
              
              <ul 
                className={`dropdown-menu dropdown-menu-end border-0 shadow p-3 rounded-3 shadow-lg end-0 ${showDropdown ? 'show' : ''}`}
                style={{ minWidth: '260px', top: '100%', left: 'auto' }}
              >
                {token ? (
                  /* IF REGISTERED & LOGGED IN */
                  <>
                    <li className="px-2 py-1 mb-2">
                      <div className="fw-bold text-dark fs-6">Hello User</div>
                      <small className="text-muted">Manage account profile settings</small>
                    </li>
                    <li><hr className="dropdown-divider my-2" /></li>
                    <li><Link to="/user/dashboard" className="dropdown-item py-2 px-3 rounded-2 fw-semibold text-secondary"><i className="bi bi-speedometer2 me-2"></i> Dashboard</Link></li>
                    <li><Link to="/user/orders" className="dropdown-item py-2 px-3 rounded-2 fw-semibold text-secondary"><i className="bi bi-box-seam me-2"></i> My Orders</Link></li>
                    <li><hr className="dropdown-divider my-2" /></li>
                    <li><button onClick={handleLogout} className="dropdown-item py-2 px-3 rounded-2 fw-semibold text-danger bg-transparent border-0 w-100 text-start"><i className="bi bi-box-arrow-right me-2"></i> Logout</button></li>
                  </>
                ) : (
                  /* IF ANONYMOUS GUEST */
                  <>
                    <li className="px-2 py-1 mb-2">
                      <div className="fw-bold text-dark fs-6">Welcome</div>
                      <small className="text-muted">
                        {isExistingUser ? 'Sign in to access your profile' : 'Create an account to start tracking'}
                      </small>
                    </li>
                    <li className="px-2 my-2">
                      <button 
                        onClick={openDefaultAuthFlow} 
                        className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-white shadow-sm"
                      >
                        {isExistingUser ? 'Sign In' : 'Sign Up'}
                      </button>
                    </li>
                    <li><hr className="dropdown-divider my-2" /></li>
                    <li>
                      <button 
                        onClick={() => { setShowDropdown(false); setIsLoginOpen(true); }} 
                        className="dropdown-item py-2 px-3 rounded-2 fw-semibold text-secondary bg-transparent border-0 text-start w-100"
                      >
                        <i className="bi bi-box-seam me-2"></i> My Orders
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Shopping Cart Link */}
            <Link to="/cart" className="text-decoration-none position-relative text-dark px-2 py-1 d-flex flex-column align-items-center gap-1 text-secondary">
              <div className="position-relative">
                <i className="bi bi-cart3 fs-3 lh-1"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger font-monospace px-1 py-0.5 fs-7">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="fs-7 fw-semibold d-none d-lg-inline">Cart</span>
            </Link>
          </div>

        </div>
      </nav>

      {/* CATEGORY DRAWER SUBMENU Slider */}
      <CategoryMenu />

      {/* DYNAMIC BACKEND MODAL HOOKS */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} 
      />

      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} 
      />

    </div>
  );
}