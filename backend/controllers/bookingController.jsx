const Booking = require('../models/Booking.jsx');
const Machine = require('../models/Machine.jsx');

exports.bookSlot = async (req, res) => {
  const { userId, machineId, slot } = req.body;
  try {
    const booking = new Booking({ user: userId, machine: machineId, slot });
    await booking.save();
    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error booking slot', error });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user').populate('machine');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};
