import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          src="/logo1.png" // replace with your actual logo path
          alt="Logo"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* Right: Floating Buttons */}
      <div className="flex flex-wrap gap-3 items-center text-sm font-semibold">
        <NavItem to="/" label="Home" />
        <NavItem to="/what-we-do" label="What We Do" />
        <NavItem to="/get-involved" label="Get Involved" />

        {!user ? (
          <>
            <NavItem to="/login" label="Login" />
            <NavItem to="/register" label="Register" />
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