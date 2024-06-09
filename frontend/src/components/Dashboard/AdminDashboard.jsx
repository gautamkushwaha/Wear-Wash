import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setdata] = useState({
   
  });
  const [date, setDate] = useState();
  const [error , setError] = useState('');
  // const [timeslots,setTimeslots] = useState([]);

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

  },[]);

  const fetchBookings = async () => {

   
    try {
      // console.log("fetch bookings");
      // const res = await axios.get('/api/bookings');
      // setBookings(res.data);
        
      const res = await axios.get('http://localhost:5001/api/admin/',{
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        params : {
          date : todayDate ,  
        }
      });

      console.log(res); 
      
      if(res.data.msg === "user is not admin"){
        setError("user is not admin");
      }
      else{

        
         
        const finalres = res.data;

        console.log(finalres);
        setdata(finalres);

        
        // setTimeslots();
       


      
      }
      
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };


  return (
    <div className="admin-dashboard">
      <h2 className="text-2xl font-semibold">All Bookings of the day {todayDate}</h2>

      <ul>
        {data.Bookingdata?.map((booking) => (
          <li key={booking._id}>
            {booking.machine} - {booking.timeSlot}
          </li>
        ))}
      </ul>
      <div>
        <h3>total users : {data.totalusers}</h3>
        <h3>male users :{data.maleusers}</h3>
        <h3>female users :{data.femaleusers}</h3>
      </div>
      <h3>{error}</h3>
    </div>
  );
};

export default AdminDashboard;
