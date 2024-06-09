// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserDashboard = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchUserBookings = async () => {
//       try {
//         const res = await axios.get('/api/bookings/user');
//         setBookings(res.data);
//       } catch (error) {
//         console.error('Error fetching user bookings', error);
//       }
//     };
//     fetchUserBookings();
//   }, []);

//   return (
//     <div className="user-dashboard">
//       <h2 className="text-2xl font-semibold">My Bookings</h2>
//       <ul>
//         {bookings.map((booking) => (
//           <li key={booking._id}>
//             {booking.machineId} - {booking.slot}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserDashboard;
// import React from 'react'

// function UserDashboard() {
//   return (
//     <div>
//       <h1>user dashboard</h1>
//     </div>
//   )
// }






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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-dashboard">
      <h2 className="text-2xl font-semibold">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <ul>
          {bookings.map((booking) =>{
            
            const dateString  = booking.date;
            const date = new Date(dateString);
const formattedDate = date.toISOString().split('T')[0];


            return (
            <li key={booking._id}>
              {booking.machine} - {formattedDate}- {booking.timeSlot}
            </li>
          )})}
        </ul>
      )}
      <button onClick={() => navigate('/slotbooking')}>Book slot</button>
    </div>
  );
};

export default UserDashboard;
