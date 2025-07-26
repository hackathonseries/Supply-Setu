import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 px-6 py-3 flex justify-between items-center bg-transparent">
      {/* Left: Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/logo1.png"
          alt="Logo"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* Right: Links */}
      <div className="flex flex-wrap gap-3 items-center text-sm font-semibold">
        <NavItem to="/" label="Home" />
        <NavItem to="/what-we-do" label="What We Do" />
        <NavItem to="/get-involved" label="Get Involved" />
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>

        {!isAuthenticated ? (
          <>
            <NavItem to="/login" label="Login" />
            
          </>
        ) : (
          <>
            <NavItem to={`/${user.role}-dashboard`} label="Dashboard" />
            <button
              onClick={handleLogout}
              className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition font-bold"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// ✅ Reusable NavItem styled as floating buttons
const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className="bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition font-bold"
  >
    {label}
  </NavLink>
);

export default Navbar;