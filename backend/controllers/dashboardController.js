const SurplusPost = require('../models/SurplusPost');
const Booking = require('../models/Booking'); // assuming this was created earlier
const DeliveryLog = require('../models/DeliveryLog');

exports.getVendorAnalytics = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    // 1. Total Posts
    const totalPosts = await SurplusPost.countDocuments({ vendor: vendorId });

    // 2. Total Booked
    const bookedPosts = await Booking.countDocuments({ vendor: vendorId });

    // 3. Deliveries Completed
    const deliveredLogs = await DeliveryLog.find({
      surplusPost: { $in: await SurplusPost.find({ vendor: vendorId }).distinct('_id') },
      'updates.status': 'Delivered'
    });

    // 4. Avg Delivery Time
    let totalDuration = 0;
    let count = 0;

    for (const log of deliveredLogs) {
      const booked = log.updates.find(u => u.status === 'Booked');
      const delivered = log.updates.find(u => u.status === 'Delivered');
      if (booked && delivered) {
        totalDuration += new Date(delivered.timestamp) - new Date(booked.timestamp);
        count++;
      }
    }

    const avgDeliveryTime = count > 0 ? totalDuration / count / (1000 * 60 * 60) : 0; // in hours

    // 5. Expiring Soon
    const expiringSoon = await SurplusPost.countDocuments({
      vendor: vendorId,
      expiryDate: { $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      totalPosts,
      bookedPosts,
      deliveriesCompleted: deliveredLogs.length,
      avgDeliveryTimeInHours: avgDeliveryTime.toFixed(2),
      expiringSoon
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};