import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import NotificationSystem from '../components/NotificationSystem';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src="/logo.png"
                alt="SurplusHub Logo"
                className="w-12 h-12 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200"
                style={{ objectFit: 'cover' }}
              />
              <span className="text-2xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                SurplusHub
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            {/* Vendor-specific links */}
            {user?.role === 'vendor' && (
              <>
                <Link to="/surplus-exchange" className="nav-link">
                  Surplus Exchange
                </Link>
                <Link to="/supplier-marketplace" className="nav-link">
                  Supplier Marketplace
                </Link>
                <Link to="/transaction-history" className="nav-link">
                  Transactions
                </Link>
              </>
            )}
            {/* Supplier-specific links */}
            {user?.role === 'supplier' && (
              <>
                <Link to="/create-product" className="nav-link">
                  Add Product
                </Link>
                <Link to="/create-delivery" className="nav-link">
                  Create Delivery
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notification System */}
            {user && <NotificationSystem />}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-full transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-base">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-base font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-200">
                    {user.name}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/90 rounded-2xl shadow-2xl border border-gray-100 z-50 backdrop-blur-md">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-base font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <Link
                        to={user.role === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard'}
                        className="block px-4 py-2 text-base text-gray-700 hover:bg-green-50 rounded-xl transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-base text-gray-700 hover:bg-green-50 rounded-xl transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-green-50 rounded-xl transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="nav-link"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 bg-white/95 rounded-b-2xl shadow-xl backdrop-blur-md">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {/* Vendor-specific mobile links */}
              {user?.role === 'vendor' && (
                <>
                  <Link
                    to="/surplus-exchange"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Surplus Exchange
                  </Link>
                  <Link
                    to="/supplier-marketplace"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Supplier Marketplace
                  </Link>
                  <Link
                    to="/transaction-history"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Transactions
                  </Link>
                </>
              )}
              {/* Supplier-specific mobile links */}
              {user?.role === 'supplier' && (
                <>
                  <Link
                    to="/create-product"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/create-delivery"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Delivery
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
};

// Mild, modern nav-link style
// Add this to your global CSS or Tailwind config if not present
// .nav-link {
//   @apply text-gray-700 hover:text-green-600 px-3 py-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400;
// }

export default Navbar;