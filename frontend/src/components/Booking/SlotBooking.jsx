import React, { useState } from 'react';
import axios from 'axios';

const SlotBooking = () => {
  const [machineId, setMachineId] = useState('');
  const [slot, setSlot] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/bookings/book', { machineId, slot });
      console.log('Booking successful', res.data);
    } catch (error) {
      console.error('Error booking slot', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="slot-booking-form">
      <div>
        <label>Machine ID</label>
        <input
          type="text"
          value={machineId}
          onChange={(e) => setMachineId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Slot</label>
        <input
          type="datetime-local"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
        />
      </div>
      <button type="submit">Book Slot</button>
    </form>
  );
};

export default SlotBooking;
