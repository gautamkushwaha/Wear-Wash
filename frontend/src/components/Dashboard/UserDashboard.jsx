




// export default UserDashboard
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const navigate = useNavigate();





const  UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    
    fetchUserBookings();
    fetchActivityData();
  }, []);

  const fetchActivityData = async ()=>{
    const res = await axios.get('http://localhost:5001/api/bookings/activityData',{
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }) 
    console.log(res);  
}


  const fetchUserBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
     
      // Ensure the response data is an array
      if (Array.isArray(res.data)) {
        // console.log(res.data);
        setBookings(res.data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      setError('Error fetching user bookings try logging in ');
      console.error('Error fetching user bookings', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings available.</p>
      ) : (
        <ul className="space-y-2">
          {bookings.map((booking) => {
            const dateString  = booking.date;
            const date = new Date(dateString);
            const formattedDate = date.toISOString().split('T')[0];
            
            return (
              <li key={booking._id} className="p-2 border-b border-gray-300">

                <p className=''> Machine ID: {booking.machine}</p>
                <p className=''> Booked Time slot: {formattedDate}</p>
                <p> Booked time Slot: {booking.timeSlot}</p>
                <p>Time in Hour:Minute left to start your slot {}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Start</button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => navigate('/slotbooking')} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book Slot
        </button>
      </div>
    </div>
  </div>
  );
};

export default UserDashboard;
