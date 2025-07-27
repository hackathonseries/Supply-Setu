import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './pages/vendor/Analytics.jsx'
import AddSurplus from './pages/vendor/AddSurplus.jsx'
import CreateDelivery from './pages/Supplier/CreateDelivery.jsx'
import SurplusExchange from './pages/vendor/SurplusExchange.jsx'
import SupplierMarketplace from './pages/vendor/SupplierMarketplace.jsx'
import TransactionHistory from './pages/vendor/TransactionHistory.jsx'
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

import Home from './pages/Home';
import About from './pages/About';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import SupplierDashboard from './pages/SupplierDashboard.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import CreateProduct from './pages/CreateProduct.jsx';
import EditProduct from './pages/EditProduct.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
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

          {/* Protected Add Surplus (vendor-only) */}
          <Route
            path="/add-surplus"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <AddSurplus />
              </ProtectedRoute>
            }
          />

          {/* Protected Create Delivery (supplier-only) */}
          <Route
            path="/create-delivery"
            element={
              <ProtectedRoute allowedRoles={['supplier']}>
                <CreateDelivery />
              </ProtectedRoute>
            }
          />

          {/* Protected Surplus Exchange (vendor-only) */}
          <Route
            path="/surplus-exchange"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <SurplusExchange />
              </ProtectedRoute>
            }
          />

          {/* Protected Supplier Marketplace (vendor-only) */}
          <Route
            path="/supplier-marketplace"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <SupplierMarketplace />
              </ProtectedRoute>
            }
          />

          {/* Protected Transaction History (vendor-only) */}
          <Route
            path="/transaction-history"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />

          <Route path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          
          {/* Protected Profile (all authenticated users) */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;