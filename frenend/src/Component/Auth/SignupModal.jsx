import React, { useState } from 'react';
export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/apiv2/auth/signup`, {
      //const response = await fetch('http://localhost:8080/apiv2/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed. Please check your data.');
      }

      localStorage.setItem('token', data.token);
     // localStorage.setItem('isExistingUser', 'true');
      
      window.location.reload(); 
      onClose();
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show d-block" tabIndex="-1" style={{ top: '10%' }}>
        <div className="modal-dialog modal-dialog-centered mx-auto" style={{ maxWidth: '400px' }}>
          <div className="modal-content border-0 shadow-lg rounded-4 p-3">
            
            <div className="modal-header border-0 pb-0 justify-content-between align-items-center">
              <h5 className="modal-title fw-bold text-dark fs-4">Create Account</h5>
              <button type="button" className="btn-close shadow-none" onClick={onClose} disabled={loading}></button>
            </div>

            <div className="modal-body py-3">
              {errorMsg && (
                <div className="alert alert-danger border-0 rounded-3 small py-2 px-3 fw-medium mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>{errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Full Name</label>
                  <input 
                    type="text" name="name" required
                    className="form-control shadow-none bg-light border-0 py-2" 
                    placeholder="Enter your full name"
                    value={formData.name} onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Email Address</label>
                  <input 
                    type="email" name="email" required
                    className="form-control shadow-none bg-light border-0 py-2" 
                    placeholder="Enter your email"
                    value={formData.email} onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary">Phone</label>
                  <input 
                    type="number" name="phone" required
                    className="form-control shadow-none bg-light border-0 py-2" 
                    placeholder="Enter your Phone"
                    value={formData.phone} onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-semibold text-secondary">Password</label>
                  <input 
                    type="password" name="password" required
                    className="form-control shadow-none bg-light border-0 py-2" 
                    placeholder="Enter your password"
                    value={formData.password} onChange={handleChange}
                  />
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-white shadow-sm mb-3 d-flex align-items-center justify-content-center"
                >
                  {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : 'Get Started'}
                </button>
              </form>

              <div className="text-center mt-2">
                <p className="small text-muted mb-0">
                  Already registered?{' '}
                  <button onClick={onSwitchToLogin} className="btn btn-link p-0 small fw-bold text-decoration-none shadow-none" disabled={loading}>
                    Sign In here
                  </button>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}