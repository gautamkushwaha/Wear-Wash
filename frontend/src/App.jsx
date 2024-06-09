import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookingPage from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import SlotBooking from './components/Booking/SlotBooking';
import './App.css';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
      
function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path='/slotbooking' element={<SlotBooking/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
