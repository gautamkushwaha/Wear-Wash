const asynchandler = require("express-async-handler");
const Razorpay = require("razorpay");
require("dotenv").config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Booking = require("../models/Booking");




const orderController = asynchandler(async (req, res) => {
    try {
      // console.log("hello");
  
      // console.log(req.body);
  
      const {machineId,date,timeslot,options} = req.body ;
  
      // console.log(machineId,options);
  
      
      
  
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRECT,
      });
  
      // const options = req.body ;
      // console.log(options);
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error in order details ");
      }

      // console.log("hi backend");
      // console.log(order);


      // res.json(order);
      res.json(order);
      
    } catch (error) {
      console.log(error);
      res.status(500).send("Error");
    }
  });


  const orderValidationController = asynchandler(async (req,res)=>{

    console.log(req.body.data);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.data;

    // console.log(razorpay_order_id,razorpay_payment_id,razorpay_signature);
    // console.log("payment is legit hello ");


    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRECT);
    // console.log(sha);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    console.log(digest);


    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    console.log("payment is legit confrom ");
  
    res.send({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    // msg:"success",
    });



  });


  const activityDataController = asynchandler(async (req,res)=>{
    
    function isDateOlderThanToday(inputDate) {
      // Parse the input date
      const dateToCheck = new Date(inputDate);
  
      // Get the current date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight to compare only the date part
  
      // Compare the dates
      return dateToCheck > today;
  }
  let decodeduserid ;
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('User is not authorized');
      }
   decodeduserid = decoded.user.id;
      console.log("hello from activity");
      console.log(decodeduserid);
      
    })
  }

  const userBookings = await Booking.find({user : decodeduserid});
  // console.log("userBookings", userBookings);

  const userBookingDates = [];

  userBookings.map(booking =>{
    
    console.log(booking.date);
    userBookingDates.push(isDateOlderThanToday(booking.date));

    // userBookingDates.push(booking.date);
  });

  console.log(userBookingDates);




  


  res.send({msg : "response from activity"});
  


  })
  




module.exports = { orderController,orderValidationController, activityDataController };