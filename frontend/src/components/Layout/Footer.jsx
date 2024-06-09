// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Wear and Wash</h2>
            <p className="text-gray-400">
              Your one-stop solution for booking washing machines.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Company</h2>
            <ul>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">About Us</a></li>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">Contact</a></li>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">Careers</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Support</h2>
            <ul>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">Help Center</a></li>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">FAQ</a></li>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">Privacy Policy</a></li>
              <li className="mb-1"><a href="/" className="hover:text-gray-300">Terms and Conditions</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Follow Us</h2>
            <ul className="flex space-x-4">
              <li><a href="https://facebook.com" className="hover:text-gray-300">Facebook</a></li>
              <li><a href="https://twitter.com" className="hover:text-gray-300">Twitter</a></li>
              <li><a href="https://instagram.com" className="hover:text-gray-300">Instagram</a></li>
              <li><a href="https://linkedin.com" className="hover:text-gray-300">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Wear and Wash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
