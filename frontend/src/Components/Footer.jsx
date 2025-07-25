import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 | Empowering Vendors & Suppliers</p>
        <div className="flex space-x-4 text-sm mt-2 md:mt-0">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;