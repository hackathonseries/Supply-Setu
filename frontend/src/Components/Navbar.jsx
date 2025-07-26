import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-green-700">Project for Hackathon</Link>
      <div className="space-x-4 text-sm font-medium text-gray-700 flex items-center">
        <Link to="/about">About</Link>
        <Link to="/what-we-do">What We Do</Link>
        <Link to="/vendor">For Vendors</Link>
        <Link to="/supplier">For Suppliers</Link>
        <Link
          to="/login"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-200"
        >
          Login / Dashboard
        </Link>
        <Link
          to="/register"
          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 border border-green-600 transition duration-200"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;