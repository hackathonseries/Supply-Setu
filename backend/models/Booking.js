const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  surplusPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurplusPost',
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  pickupDetails: {
    name: String,
    phone: String,
    scheduledDate: Date
  },
  deliveryDetails: {
    address: String,
    notes: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
