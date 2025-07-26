const cron = require('node-cron');
const SurplusPost = require('../models/SurplusPost');
const Supplier = require('../models/Supplier');
const User = require('../models/User');
// Optional: replace this with real mail sender later
// const sendEmail = require('./mailer');

const startDailyBroadcast = () => {
  // ⏰ Schedule daily at 10:00 AM
  cron.schedule('0 10 * * *', async () => {
    try {
      const now = new Date();

      // Get all available surplus posts (not expired or booked)
      const surplusList = await SurplusPost.find({
        expiryTime: { $gt: now },
        isBooked: false,
      }).populate('vendorId', 'name');

      if (!surplusList.length) {
        console.log('📭 No surplus posts to broadcast today.');
        return;
      }

      // Build summary string
      const summary = surplusList.map(post => {
        return `• ${post.materialName} (${post.quantity} ${post.unit}) from ${post.vendorId.name}`;
      }).join('\n');

      // Get all supplier users (role: supplier)
      const suppliers = await User.find({ role: 'supplier' });

      // Simulate sending summary to each supplier
      for (const supplier of suppliers) {
        console.log(`📨 Sending surplus summary to ${supplier.email}`);
        console.log(summary);
        // In real case: await sendEmail(supplier.email, 'Daily Surplus Update', summary)
      }

      console.log(`✅ Broadcasted to ${suppliers.length} suppliers.`);
    } catch (err) {
      console.error('Daily broadcast failed:', err.message);
    }
  });

  console.log('📡 Daily surplus broadcast scheduler running (10 AM daily)');
};

module.exports = startDailyBroadcast;