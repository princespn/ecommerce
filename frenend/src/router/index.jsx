import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Storefront Pages
const HomePage = lazy(() => import("../Pages/home/index.jsx"));
const ProductDetail = lazy(() => import("../Pages/poduct/ProductDetail"));
const CartPage = lazy(() => import("../Pages/cart/Cart.jsx")); 
const CheckoutPage = lazy(() => import("../Pages/checkout/Checkout.jsx")); 
const PaymentPage = lazy(() => import("../Pages/payment/Payment.jsx")); 

// Admin Portal Pages
const AdminLogin = lazy(() => import("../Pages/admin/auth/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("../Pages/admin/AdminDashboard.jsx"));
const AdminCategory = lazy(() => import("../Pages/admin/category/index.js"));
const AdminProduct = lazy(() => import("../Pages/admin/product/index.js"));

const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default function AppRouter() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/categories" element={<AdminCategory />} />
          <Route path="/admin/products" element={<AdminProduct />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}