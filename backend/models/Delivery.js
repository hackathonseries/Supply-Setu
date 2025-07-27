const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
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
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'picked_up', 'delivered', 'cancelled'],
    default: 'pending'
  },
  pickupDetails: {
    scheduledDate: {
      type: Date,
      required: true
    },
    pickupLocation: {
      type: String,
      required: true
    },
    contactPerson: {
      type: String,
      required: true
    },
    contactPhone: {
      type: String,
      required: true
    },
    specialInstructions: String
  },
  deliveryDetails: {
    deliveryAddress: {
      type: String,
      required: true
    },
    deliveryContact: {
      type: String,
      required: true
    },
    deliveryPhone: {
      type: String,
      required: true
    },
    deliveryNotes: String
  },
  tracking: {
    currentLocation: String,
    estimatedDelivery: Date,
    actualPickupTime: Date,
    actualDeliveryTime: Date,
    driverNotes: String
  },
  documents: [{
    type: {
      type: String,
      enum: ['invoice', 'receipt', 'photo', 'other']
    },
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notifications: [{
    type: {
      type: String,
      enum: ['pickup_scheduled', 'pickup_confirmed', 'in_transit', 'delivered', 'cancelled']
    },
    message: String,
    sentTo: {
      type: String,
      enum: ['vendor', 'supplier', 'both']
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { 
  timestamps: true 
});

// Index for efficient queries
deliverySchema.index({ booking: 1 });
deliverySchema.index({ vendor: 1 });
deliverySchema.index({ supplier: 1 });
deliverySchema.index({ status: 1 });

module.exports = mongoose.model('Delivery', deliverySchema);