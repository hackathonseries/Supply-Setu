import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 px-6 py-3 flex justify-between items-center">
      {/* Left logo + name */}
      <div className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/40" // replace with your logo URL
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <Link to="/" className="text-xl font-bold text-green-700">HAC-ker</Link>
      </div>

      {/* Right side links */}
      <div className="space-x-4 text-sm font-medium text-gray-700 flex items-center">
        <Link to="/about">About</Link>
        <Link to="/what-we-do">What We Do</Link>

        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 border border-green-600 transition duration-200"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;