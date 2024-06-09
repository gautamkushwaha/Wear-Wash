// src/components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Wear and Wash</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Services</a></li>
            <li><a href="/pricing" className="hover:text-gray-300">Pricing</a></li>
            <li><a href="/login" className="hover:text-gray-300">Login</a></li>
            <li><a href="/register" className="hover:text-gray-300">Register</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
