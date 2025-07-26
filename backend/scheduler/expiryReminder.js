const cron = require('node-cron');
const SurplusPost = require('../models/SurplusPost');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

cron.schedule('0 9 * * *', async () => {
  console.log("🔔 Running Expiry Reminder Task...");

  const now = new Date();
  const in2Days = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);

  const expiring = await SurplusPost.find({
    expiryDate: { $lte: in2Days },
    notified: { $ne: true }
  });

  for (const post of expiring) {
    const vendor = await User.findById(post.vendor);

    await sendEmail(vendor.email,
      "⚠️ Expiry Alert",
      `Your surplus item "${post.title}" will expire on ${post.expiryDate.toDateString()}. Please take action.`);

    post.notified = true;
    await post.save();
  }
});