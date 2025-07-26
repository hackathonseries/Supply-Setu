import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './pages/vendor/Analytics.jsx'
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

import Home from './pages/Home';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import SupplierDashboard from './pages/SupplierDashboard.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />

          {/* Protected Dashboard (general access) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Supplier Dashboard */}
          <Route
            path="/supplier-dashboard"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <SupplierDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Vendor Dashboard */}
          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Create Product (supplier-only) */}
          <Route
            path="/create-product"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <CreateProduct />
              </ProtectedRoute>
            }
          />

          {/* Protected Vendor Analytics */}
          <Route
            path="/vendor-analytics"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;