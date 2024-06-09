// import React, { useState } from 'react';
// import axios from 'axios';

// const SlotBooking = () => {
//   const [machineId, setMachineId] = useState('');
//   const [slot, setSlot] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/bookings/book', { machineId, slot });
//       console.log('Booking successful', res.data);
//     } catch (error) {
//       console.error('Error booking slot', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="slot-booking-form">
//       <div>
//         <label>Machine ID</label>
//         <input
//           type="text"
//           value={machineId}
//           onChange={(e) => setMachineId(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Slot</label>
//         <inputN
//           type="datetime-local"
//           value={slot}
//           onChange={(e) => setSlot(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit">Book Slot</button>
//     </form>
//   );
// };

// export default SlotBooking;
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const BookingSlot = () => {
  const [machineId, setMachineId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [TimeSlots, setTimeSlots] = useState([]);

  const navigate = useNavigate();

  const Gotouserdash = () => {
    navigate("/user-dashboard");
  };

  // const timeSlots = generateTimeSlots();

  // const generateTimeSlots =  () => {
  //   const slots = [];
  //   for (let hour = 0; hour < 24; hour++) {
  //     const start = hour < 10 ? `0${hour}:00` : `${hour}:00`;
  //     const end = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
  //     slots.push(`${start} - ${end}`);
  //   }

  //   return slots;
  // };

  const userid = localStorage.getItem("token");

  if (!userid) {
    navigate("/login");
  }
  //  console.log(userid);

  const handelTimeSlots = async () => {
    if (date) {
      // console.log("hello ");
      // const slots = [];
      // for (let hour = 0; hour < 24; hour++) {
      //   const start = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      //   const end = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
      //   slots.push(`${start} - ${end}`);
      // }

      const res = await axios.post("http://localhost:5001/api/gettimeslots", {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`
        // },

        date,
      });

      // console.log(res.data.result1);
      const finalres = res.data.result1;
      setTimeSlots(finalres);
    } else {
      setError("please select a date");
    }
    // console.log(slots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5001/api/order", {
        machineId,
        date,
        timeSlot,
        options: {
          amount: 10000,
          currency: "INR",
          receipt: "receipt#1",
          notes: {
            key1: "value3",
            key2: "value2",
          },
        },
      });

      // console.log(res.data);

      const order = res.data;
      console.log(order);

      var options = {
        key: "rzp_test_oRzIqkugevfm47", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Wear N Wash crop ", //your business name
        description: "Slot Booking Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          // console.log("hi from res");

          const data = {
            ...response,
          };

          // console.log("sending data to validate ");

          const validateRes = await axios.post(
            "http://localhost:5001/api/order/validate",
            {
              data,
            }
          );

          if (validateRes.data.msg === "success") {
            try {
              // console.log("sending data to jwt ");

              const bookres = await axios.post(
                "http://localhost:5001/api/bookings",
                {
                  machineId,
                  date,
                  timeSlot,
                  userid,
                }
              );

              // console.log("happy harsha");
              // console.log("going to dash");
              Gotouserdash();

              // phone pe integration
            } catch (error) {
              console.log(error);
            }
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Harsha Kumar", //your customer's name
          email: "Harsha.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();

      // rzp1.open();
      // e.preventDefault();
      // window.location.href = res.data
    } catch (error) {
      setError("Error booking slot. Please try again.");
      console.error("Error booking slot", error);
      setSuccess(null);
    }
  };

  return (
    <div className="booking-slot">
      <h2 className="text-2xl font-semibold">Book a Slot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="machineId">Machine ID:</label>
          <input
            type="text"
            id="machineId"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button onClick={handelTimeSlots}>Get TimeSlots </button>
        </div>
        <div>
          <label htmlFor="timeSlot">Time Slot:</label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select a date to getytime slot</option>
            {TimeSlots?.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingSlot;
