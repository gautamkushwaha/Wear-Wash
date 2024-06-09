
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Book a Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label htmlFor="machineId" className="block text-sm font-medium text-gray-700">Machine ID:</label>
          <input
            type="text"
            id="machineId"
            value={machineId}
            onChange={(e) => setMachineId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
          />
        </div>
        <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
          />
          <button 
          onClick={handelTimeSlots}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Get TimeSlots </button>
        </div>
        <div>
        <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">Time Slot:</label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
        {error && <div className="text-red-600 text-sm error">{error}</div>}
        {success && <div className="text-green-600 text-sm success">{success}</div>}
        <button 
        type="submit" 
        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default BookingSlot;
