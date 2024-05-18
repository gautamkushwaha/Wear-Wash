const express = require('express');
const { bookSlot, getBookings } = require('../controllers/bookingController.jsx');
const router = express.Router();

router.post('/book', bookSlot);
router.get('/', getBookings);

module.exports = router;
