import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="border-gray-700 text-center text-sm text-gray-400">
        &copy; 2025 | Built with <span className="text-red-500">❤️</span> by <span className="text-white font-semibold">Team Tech Hustlers</span>
      </div>
    </footer>
  );
};

export default Footer;