
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.accessToken);
      navigate('/user-dashboard');
      console.log("navigation successful")
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full">

        {/* if you don't have an account create a account */}
        <div className='w-1/2 p-8'>
          <div className=" mb-4 flex justify-between ">
            <h2 className="text-3xl font-bold ">Login</h2>
            <a href="/register" className="text-blue-500 hover:underline mt-2 text-right ">Create a new Account</a>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange} required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
          </form>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" className="text-blue-600 hover:text-blue-800"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" className="text-blue-600 hover:text-blue-800"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" className="text-blue-600 hover:text-blue-800"><FaLinkedin size={24} /></a>
            </div>
            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
        </div>
        <div className="w-1/2 p-8">
          <img src="https://images.samsung.com/is/image/samsung/p6pim/ph/wd13tp44dsx-tc/gallery/ph-combo-wd12tp44dsxsp-wd13tp44dsx-tc-456460679?$720_576_JPG$" alt="Register" className="w-full h-full object-cover" />
        </div>
      </div></div>
  );
};

export default Login;
