const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  qrCode: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available',
  },
});

module.exports = mongoose.model('Machine', machineSchema);
