import React from 'react';
import { Link } from 'react-router-dom';
// Import your image



const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between my-[100px]   mx-[120px]">
      <div className="md:w-1/2">
      <div className="text-left">
      <p className="text-xl font-bold">Laundry Service</p>
      <div className="w-[150px] h-px bg-yellow-400"></div>
     
    </div>
        <h1 className="text-5xl font-bold mb-4">Laundry & Dry Cleaning 
       <br></br> Fast & Instant</h1>
        <p className="text-gray-700 mb-6 mr-3">
          Simplify your laundry with our easy-to-use booking system. Book a slot, wash your clothes, and enjoy hassle-free laundry days!
        </p>
        <div>
          <Link to="/login">
            <button className="bg-blue-500 text-white px-6 py-2 rounded mr-4">Login</button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 text-white px-6 py-2 rounded">Register</button>
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img src="/hero-section.svg" alt="Hero" className="rounded-lg shadow-lg w-full" />
      </div>
    </div>
  );
};

export default HeroSection;