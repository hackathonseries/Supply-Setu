import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import NotificationSystem from '../Components/NotificationSystem';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent pointer-events-none">
      <div className="px-4 sm:px-6 lg:px-8 pointer-events-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
  <Link to="/" className="flex items-center space-x-2">
    <img
      src="/logo2.png"
      alt="SurplusHub Logo"
      className="w-14 h-14 object-cover rounded-full border-2 shadow-md"
    />
    <span className="text-xl font-bold text-[#064152]">SurplusHub</span>
  </Link>
</div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
  {[
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ].map(({ to, label }) => (
    <Link
      key={to}
      to={to}
      className="text-white bg-black/30 hover:bg-gray/20 px-4 py-1 rounded-full transition-all duration-200 backdrop-blur-md"
    >
      {label}
    </Link>
  ))}

  {user?.role === 'vendor' && (
    <>
      <Link to="/surplus-exchange" className="text-white bg-black/30 hover:bg-white/20 px-4 py-1 rounded-full">
        Surplus Exchange
      </Link>
      <Link to="/supplier-marketplace" className="text-white bg-black/30 hover:bg-white/20 px-4 py-1 rounded-full">
        Supplier Marketplace
      </Link>
      <Link to="/transaction-history" className="text-white bg-black/30 hover:bg-white/20 px-4 py-1 rounded-full">
        Transactions
      </Link>
    </>
  )}

  {user?.role === 'supplier' && (
    <>
      <Link to="/create-product" className="text-white bg-black/30 hover:bg-white/20 px-4 py-1 rounded-full">
        Add Product
      </Link>
      <Link to="/create-delivery" className="text-white bg-black/30 hover:bg-white/20 px-4 py-1 rounded-full">
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
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                    <div className="py-2">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                      
                      <Link
                        to={user.role === 'vendor' ? '/vendor-dashboard' : '/supplier-dashboard'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      
                      
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Sign In
                </Link> */}
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
            <Link to="/" className="text-white bg-black/30 hover:bg-white/20 px-4 py-1 rounded-full transition-all duration-200 backdrop-blur-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Vendor-specific mobile links */}
              {user?.role === 'vendor' && (
                <>
                  <Link
                    to="/surplus-exchange"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Surplus Exchange
                  </Link>
                  <Link
                    to="/supplier-marketplace"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Supplier Marketplace
                  </Link>
                  <Link
                    to="/transaction-history"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
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
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Product
                  </Link>
                  <Link
                    to="/create-delivery"
                    className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
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

export default Navbar;