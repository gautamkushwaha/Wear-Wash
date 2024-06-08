import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [date, setDate] = useState([]);
  const [error , setError] = useState([]);

  const getTodayDate = () => {
    const today = new Date();
    // console.log(today);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const todayDate = getTodayDate();




  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {

   
    try {
      // console.log("fetch bookings");
      // const res = await axios.get('/api/bookings');
      // setBookings(res.data);
        
      const res = await axios.get('http://localhost:5001/api/admin/bookings',{
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        params : {
          date : todayDate ,  
        }
      });

      // console.log(res); 
      
      if(res.data.msg === "user is not admin"){
        setError("user is not admin");
      }
      else{

        
        const data = res.data ; 
      
      setBookings(data);
      }
      
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };


  return (
    <div className="admin-dashboard">
      <h2 className="text-2xl font-semibold">All Bookings of the day {todayDate}</h2>

      <ul>
        {bookings?.map((booking) => (
          <li key={booking._id}>
            {booking.machine} - {booking.timeSlot}
          </li>
        ))}
      </ul>
      <h3>{error}</h3>
    </div>
  );
};

export default AdminDashboard;
