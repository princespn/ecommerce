import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../admin/AdminLeftmenue.jsx';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar handleLogout={handleLogout} />

      <main className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}