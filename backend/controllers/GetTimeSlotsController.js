const asynchandler = require("express-async-handler");
const Booking = require("../models/Booking.js");



const GetTimeSlotsController = asynchandler(async (req,res)=>{
        // console.log("hello from book slots");
        // console.log(req.body);
        const {date } = req.body;


        const genereatedTimeSlots = [];
        const serverTimeslots = [];

        for (let hour = 0; hour < 24; hour++) {
                const start = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                const end = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
                genereatedTimeSlots.push(`${start} - ${end}`);
              }

        const data = await Booking.find({date});

        // console.log(data);

        data.map((obj)=>{

            serverTimeslots.push(obj.timeSlot);

        })

        // console.log(genereatedTimeSlots);
        // console.log(serverTimeslots);

        const result1 = genereatedTimeSlots.filter(element => !serverTimeslots.includes(element));

        res.send({
            result1
        })


});


module.exports = { GetTimeSlotsController };
