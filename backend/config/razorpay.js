// config/razorpay.js
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Check if environment variables are set
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('⚠️  Razorpay credentials not found in environment variables.');
  console.warn('   Please check your .env file contains:');
  console.warn('   RAZORPAY_KEY_ID=your_razorpay_key_id');
  console.warn('   RAZORPAY_KEY_SECRET=your_razorpay_secret_key');
  console.warn('   For testing, you can use Razorpay test credentials.');
  console.warn('   The payment functionality will be disabled until credentials are provided.');
}

// Create Razorpay instance only if credentials are available
let razorpay = null;

try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log('✅ Razorpay initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error.message);
}

module.exports = razorpay;