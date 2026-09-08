cd ..
npm create vite@latest frontend -- --template react
npm install
npm install react-bootstrap bootstrap axios react-icons
npm install react-router-dom jwt-decode
npm install bootstrap-icons


import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Index from "./pages/index/Index";

const Vehicle = lazy(() => import("./pages/auto/Index"));
const HomePage = lazy(() => import("./pages/home/Index"));
const Login = lazy(() => import("./pages/login/Index"));

const AdminLayout = lazy(() => import("./pages/admin/Layout"));
const AdminDashboard = lazy(() => import("./pages/admin/dashboard/Index"));
const AllUsers = lazy(() => import("./pages/admin/all-users/Index"));
const UserDetails = lazy(() => import("./pages/admin/user-details/Index"));
const AdminQuoteDetails = lazy(() => import("./pages/admin/quote-details/Index"));

const UserLayout = lazy(() => import("./pages/user/Layout"));
const UserDashboard = lazy(() => import("./pages/user/dashboard/Index"));
const Profile = lazy(() => import("./pages/user/profile/Index"));
const UserQuoteDetails = lazy(() => import("./pages/user/quote-details/Index"));


const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      return <Navigate to="/login" replace />;
    }
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && allowedRole !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export default function AppRouter() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auto" element={<Vehicle />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          {/* -------- ADMIN ROUTES -------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Note: Nested routes in React don't repeat the parent path. 'dashboard' resolves to '/admin/dashboard' */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="user/:userId" element={<UserDetails />} />
            <Route path="quote/:quoteId" element={<AdminQuoteDetails />} />
          </Route>

          {/* -------- USER ROUTES -------- */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRole="user">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="quote/:quoteId" element={<UserQuoteDetails />} />
          </Route>

          {/* Catch-all 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}