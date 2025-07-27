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
  // Profile Information
  profileImage: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  zipCode: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  // Business Information
  companyName: {
    type: String,
    default: ''
  },
  businessType: {
    type: String,
    enum: ['manufacturing', 'wholesale', 'retail', 'service', 'other'],
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  businessHours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: true } }
  },
  serviceAreas: [{
    type: String
  }],
  categories: [{
    type: String
  }],
  // Account Settings
  emailNotifications: {
    type: Boolean,
    default: true
  },
  smsNotifications: {
    type: Boolean,
    default: false
  },
  orderUpdates: {
    type: Boolean,
    default: true
  },
  marketingEmails: {
    type: Boolean,
    default: false
  },
  privacySettings: {
    profileVisibility: {
      type: String,
      enum: ['public', 'private', 'contacts'],
      default: 'public'
    },
    showContactInfo: {
      type: Boolean,
      default: true
    },
    showBusinessInfo: {
      type: Boolean,
      default: true
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);