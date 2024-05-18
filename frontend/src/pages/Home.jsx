import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1 className="text-3xl font-bold underline">Welcome to the Washing Machine Booking System</h1>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500">Login</Link>
        <Link to="/register" className="ml-4 text-blue-500">Register</Link>
      </div>
    </div>
  );
};

export default Home;
