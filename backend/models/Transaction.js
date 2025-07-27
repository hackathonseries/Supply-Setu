// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // Basic transaction info
    transactionType: {
      type: String,
      enum: ['surplus_exchange', 'supplier_order'],
      required: true
    },
    
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    totalAmount: {
      type: Number,
      required: true,
    },
    
    currency: {
      type: String,
      default: "INR",
    },
    
    // Surplus exchange specific fields
    surplusPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SurplusPost'
    },
    
    surplusDetails: {
      materialType: String,
      quantity: Number,
      pricePerUnit: Number,
      location: String
    },
    
    // Supplier order specific fields
    supplierProducts: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      unitPrice: Number
    }],
    
    orderDetails: {
      deliveryAddress: String,
      specialInstructions: String,
      preferredDeliveryTime: String
    },
    
    // Status and history
    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "failed"],
      default: "pending",
    },
    
    statusHistory: [{
      status: {
        type: String,
        enum: ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "failed"]
      },
      notes: String,
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }],
    
    // Messages between buyer and seller
    messages: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    
    // Payment related fields (for Razorpay integration)
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    
    // Legacy fields for backward compatibility
    amount: {
      type: Number,
      required: false,
    },
    
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

// Indexes for efficient queries
transactionSchema.index({ buyer: 1, createdAt: -1 });
transactionSchema.index({ seller: 1, createdAt: -1 });
transactionSchema.index({ transactionType: 1 });
transactionSchema.index({ status: 1 });

module.exports = mongoose.model("Transaction", transactionSchema);