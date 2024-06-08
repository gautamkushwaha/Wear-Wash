const asynchandler = require("express-async-handler");
const Booking = require("../models/Booking.js");
const jwt = require('jsonwebtoken');



const adminBookingsController = asynchandler(async (req, res) => {

    let authHeader = req.headers.Authorization || req.headers.authorization;

    let user ;
    console.log(authHeader);
    token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({msg : "user is not authorized"});
        throw new Error('User is not authorized');
      }
    user = decoded.user; 
   
    });

    if(user.email === "dilli@gmail.com"){
        console.log(req.query);
        const {date} = req.query;
        const data = await Booking.find({date});
        // console.log(data);
        // res.send()
        res.send(data);
    }
    else{
        res.send({msg : "user is not admin"});
       
    }

   
    







    
});

module.exports = { adminBookingsController };
