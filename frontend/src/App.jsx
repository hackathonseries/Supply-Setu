import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';

import Home from './pages/Home';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
//import VendorPage from './pages/VendorPage';
//import SupplierPage from './pages/SupplierPage';
import Contact from './pages/Contact';
import Register from './pages/Register.jsx';
import SupplierDashboard from './pages/SupplierDashboard.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;