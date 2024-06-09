import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {

        const res = await axios.get('http://localhost:5001/api/bookings');
        setBookings(res.data);

        // const res = await axios.get('/api/bookings');
        // setBookings(res.data);
           
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2 className="text-2xl font-semibold">All Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.machineId} - {booking.slot}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
