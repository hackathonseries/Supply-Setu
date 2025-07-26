const cron = require('node-cron');
const SurplusPost = require('../models/SurplusPost');

//  Run every hour
const startExpiryScheduler = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();

      const expired = await SurplusPost.updateMany(
        { expiryTime: { $lt: now }, isBooked: false },
        { $set: { isBooked: true } }  // mark as "unavailable"
      );

      console.log(`[${new Date().toISOString()}] Expired surplus updated: ${expired.modifiedCount}`);
    } catch (err) {
      console.error('Surplus expiry scheduler failed:', err.message);
    }
  });

  console.log('✅ Surplus expiry scheduler running every hour');
};

module.exports = startExpiryScheduler;