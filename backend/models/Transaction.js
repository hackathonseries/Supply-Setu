const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // Transaction type to distinguish between surplus exchange and supplier orders
  transactionType: {
    type: String,
    enum: ['surplus_exchange', 'supplier_order'],
    required: true
  },
  
  // For surplus exchange (vendor-to-vendor)
  surplusPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurplusPost',
    required: function() { return this.transactionType === 'surplus_exchange'; }
  },
  
  // For supplier orders (supplier-to-vendor)
  supplierProducts: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    }
  }],
  
  // Parties involved
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Transaction details
  totalAmount: {
    type: Number,
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  // For surplus exchange specific fields
  surplusDetails: {
    materialType: String,
    quantity: Number,
    pricePerUnit: Number,
    location: String
  },
  
  // For supplier orders specific fields
  orderDetails: {
    shippingAddress: String,
    billingAddress: String,
    paymentMethod: String,
    notes: String
  },
  
  // Tracking and communication
  statusHistory: [{
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  
  // Communication
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Invoice/Bill generation
  invoice: {
    invoiceNumber: String,
    generatedAt: {
      type: Date,
      default: Date.now
    },
    dueDate: Date,
    paid: {
      type: Boolean,
      default: false
    }
  }
}, { 
  timestamps: true 
});

// Indexes for efficient queries
transactionSchema.index({ transactionType: 1 });
transactionSchema.index({ seller: 1 });
transactionSchema.index({ buyer: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ surplusPost: 1 });

// Pre-save middleware to generate invoice number
transactionSchema.pre('save', function(next) {
  if (this.isNew && this.transactionType === 'supplier_order') {
    this.invoice.invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

module.exports = mongoose.model('Transaction', transactionSchema); 