import React from 'react';
import SlotBooking from '../components/Booking/SlotBooking';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <h2 className="text-2xl font-semibold">Book Your Slot</h2>
      <SlotBooking />
    </div>
  );
};

export default BookingPage;
