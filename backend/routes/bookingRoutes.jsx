// const express = require('express');
// const { bookSlot ,getBookings} = require('../controllers/bookingController.jsx');
// const validateToken = require('../middleware/validateTokenHandler.js');

// const router = express.Router();



// // router.use(validateToken);


// router.post('/', bookSlot);
// router.get('/', getBookings);

// module.exports = router;

const express = require('express');
const { orderController,orderValidationController, activityDataController } = require('../controllers/orderController');
const validateToken = require('../middleware/validateTokenHandler.js');
// const { default: BookingSlot } = require('../../frontend/src/components/Booking/SlotBooking.jsx');
const {bookSlot,getBookings} = require("../controllers/bookingController.jsx");



   
const router = express.Router(); 

// router.use(validateToken);
// router.use(validateToken);

router.post("/",bookSlot);
router.post("/validate", orderValidationController);
router.get('/', getBookings);
router.get("/activityData",activityDataController);


module.exports = router;
