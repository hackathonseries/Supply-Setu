const mongoose = require('mongoose');

const materialRequestSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  materialType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'accepted', 'fulfilled'],
    default: 'open',
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('MaterialRequest', materialRequestSchema);