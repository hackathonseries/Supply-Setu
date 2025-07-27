const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['supplier', 'vendor'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Personal Information
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  // Business Information
  businessName: {
    type: String,
    trim: true,
  },
  businessType: {
    type: String,
    enum: ['manufacturing', 'retail', 'wholesale', 'service', 'consulting', 'other'],
  },
  registrationNumber: {
    type: String,
    trim: true,
  },
  taxId: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  specialties: [{
    type: String,
    trim: true,
  }],
  certifications: [{
    type: String,
    trim: true,
  }],
  // Preferences
  notifications: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    push: {
      type: Boolean,
      default: true,
    },
  },
  privacy: {
    profileVisibility: {
      type: String,
      enum: ['public', 'private', 'contacts'],
      default: 'public',
    },
    showContactInfo: {
      type: Boolean,
      default: true,
    },
    showBusinessDetails: {
      type: Boolean,
      default: true,
    },
  },
  language: {
    type: String,
    enum: ['en', 'es', 'fr', 'de', 'hi'],
    default: 'en',
  },
  timezone: {
    type: String,
    default: 'UTC',
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);