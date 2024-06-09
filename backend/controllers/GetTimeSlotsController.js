const asynchandler = require("express-async-handler");
const Booking = require("../models/Booking.js");
// import { format } from 'date-fns';

// const format = require('date-fns').format;
const { format, parseISO, addDays } = require('date-fns');


const GetTimeSlotsController = asynchandler(async (req,res)=>{
        // console.log("hello from book slots");
        // console.log(req.body);
        const {date } = req.body;
        // console.log(date);

        const today = new Date();
    const todayDate = format(today, 'yyyy-MM-dd');
    // console.log(todayDate);

    const genereatedTimeSlots = [];
        const serverTimeslots = [];

    if(date === todayDate) {

        
        const now = new Date();
        // console.log(now);
        const currentHour = now.getHours();
    
        for (let hour = currentHour; hour < 24; hour++) {
            const start = String(hour).padStart(2, '0') + ':00';
            const end = String((hour + 1) % 24).padStart(2, '0') + ':00';
            genereatedTimeSlots.push(`${start} - ${end}`);
        }

        // console.log(genereatedTimeSlots);


    }
    else{

    

        // console.log("not today date");
        

        for (let hour = 0; hour < 24; hour++) {
                const start = hour < 10 ? `0${hour}:00` : `${hour}:00`;
                const end = hour + 1 < 10 ? `0${hour + 1}:00` : `${hour + 1}:00`;
                genereatedTimeSlots.push(`${start} - ${end}`);
              }
            //   console.log(genereatedTimeSlots);

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
