const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  transactionType: {
    type: String,
    enum: ['request', 'surplus'],
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'transactionType' === 'request' ? 'MaterialRequest' : 'SurplusPost',
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-transit', 'delivered'],
    default: 'pending',
  },
  routeDetails: {
    type: String, // Optional, placeholder for route notes or coordinates
  },
  logs: [
    {
      status: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Delivery', deliverySchema);