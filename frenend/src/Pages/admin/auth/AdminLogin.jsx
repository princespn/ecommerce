import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export default function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch(`${API_URL}/apiv2/auth/login`, {
    //const response = await axios.post('http://127.0.0.1:8080/apiv2/auth/login', 
      
        email: credentials.email,
        password: credentials.password,
      }
    );

    if (response.data) {
      localStorage.setItem('adminToken', response.data.token);
      //localStorage.setItem('adminUser', JSON.stringify(response.data.user));

      navigate('/admin/dashboard');
    } else {
      setError(response.data.message || 'Invalid email or password');
    }
  } catch (error) {
    if (error.response) {
      setError(error.response.data.message || 'Login failed');
    } else {
      setError('Server error. Please try again later.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark px-3">
      <div className="card border-0 shadow-lg p-4 rounded-4 text-light" style={{ maxWidth: '420px', width: '100%', backgroundColor: '#1e1e2f' }}>
        
        {/* Header */}
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-25 text-primary d-inline-flex p-3 rounded-circle mb-3">
            <i className="bi bi-shield-lock-fill fs-2"></i>
          </div>
          <h4 className="fw-bold text-white mb-1">Admin Portal</h4>
          <small className="text-secondary">Sign in to access your management dashboard</small>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger py-2 small fw-semibold rounded-3 mb-3" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-semibold text-secondary">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary border-end-0"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" name="email" required 
                placeholder="admin@riskcare.com" 
                className="form-control bg-dark text-white border-secondary border-start-0 shadow-none py-2" 
                value={credentials.email} onChange={handleChange} 
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label small fw-semibold text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-secondary border-end-0"><i className="bi bi-key"></i></span>
              <input 
                type="password" name="password" required 
                placeholder="••••••••" 
                className="form-control bg-dark text-white border-secondary border-start-0 shadow-none py-2" 
                value={credentials.password} onChange={handleChange} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-100 fw-bold py-2 rounded-3 text-white shadow-sm d-flex align-items-center justify-content-center gap-2"
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              <>Sign In <i className="bi bi-box-arrow-in-right"></i></>
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <small className="text-muted">Protected System — Authorized Personnel Only</small>
        </div>

      </div>
    </div>
  );
}