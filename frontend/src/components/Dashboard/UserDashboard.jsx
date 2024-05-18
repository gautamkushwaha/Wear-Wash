import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await axios.get('/api/bookings/user');
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching user bookings', error);
      }
    };
    fetchUserBookings();
  }, []);

  return (
    <div className="user-dashboard">
      <h2 className="text-2xl font-semibold">My Bookings</h2>
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

export default UserDashboard;
