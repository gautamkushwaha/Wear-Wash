const Booking = require("../models/Booking.js");
const Machine = require("../models/Machine.jsx");
// const Booking = require("../models/Booking.js");
const asynchandler = require("express-async-handler");
const Razorpay = require("razorpay");
require("dotenv").config();
const jwt = require('jsonwebtoken');

// exports.bookSlot = asynchandler(async (req, res) => {
// const { qrCode, date, timeSlot } = req.body; // Use qrCode instead of machineId
// console.log(req.user.id, qrCode, date, timeSlot);

// try {
//   // Find the machine by its QR code
//   const machine = await Machine.findOne({ qrCode });
//   if (!machine) {
//     return res.status(404).json({ error: "Machine not found" });
//   }

//   // Create the booking using the machine's ObjectId
//   const newBooking = new Booking({
//     user: req.user.id, // Ensure the user ID is coming from the authenticated user
//     machine: machine._id, // Use the machine's ObjectId
//     date: new Date(date), // Parse the date correctly
//     timeSlot,
//   });
//   await newBooking.save();
//   console.log(newBooking);
//   res.status(201).json(newBooking);
// } catch (error) {
//   console.error("Error creating booking:", error);
//   res.status(500).json({ error: "Failed to create booking" });
// }

// });

const bookSlot = asynchandler(async (req, res) => {


  

  console.log("hi harsha");

  try {

    const { machineId, date,timeSlot,userid} = req.body;

    console.log(userid);

    // Verify the token and extract the data
    const decoded = jwt.verify(userid,process.env.ACCESS_TOKEN_SECRET );
    // Access the user data from the decoded token
    const userData = decoded.user;

    console.log("user data from jwt");
    console.log(userData);

    
    await Booking.create({user:userData.id,machine:machineId,date,timeSlot})
    res.send({
      data : "hello"
    })

  } catch (error) {
    console.log(error);
    res.status(500).send.apply("error on booking slot backend ")
  }

    
});

const getBookings = asynchandler(async (req, res) => {
  try {
   
 let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
    let userId ; 


  token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error('User is not authorized');
    }
    // console.log(decoded);
    userId = decoded.user.id;



  });

    // console.log("hello from get bookgins");
    const bookings = await Booking.find({user:userId})
    res.json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching  bookings", error });
  }
});

module.exports = { bookSlot,getBookings };
