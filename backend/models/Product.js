const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  description: {
    type: String,
    required: true
  },
  
  category: {
    type: String,
    required: true,
    enum: ['raw_materials', 'equipment', 'tools', 'chemicals', 'packaging', 'other']
  },
  
  price: {
    type: Number,
    required: true,
    min: 0
  },
  
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'ton', 'piece', 'liter', 'meter', 'box', 'set']
  },
  
  stockQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  
  minimumOrderQuantity: {
    type: Number,
    required: true,
    min: 1
  },
  
  images: [{
    url: String,
    alt: String
  }],
  
  specifications: [{
    name: String,
    value: String
  }],
  
  isActive: {
    type: Boolean,
    default: true
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  
  tags: [String],
  
  shippingInfo: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingCost: Number,
    freeShippingThreshold: Number
  }
}, { 
  timestamps: true 
});

// Indexes for efficient queries
productSchema.index({ supplier: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);