const mongoose = require('mongoose');

const deliveryLogSchema = new mongoose.Schema({
  surplusPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurplusPost',
    required: true
  },
  updates: [
    {
      status: {
        type: String,
        enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Delayed'],
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
      note: {
        type: String
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('DeliveryLog', deliveryLogSchema);