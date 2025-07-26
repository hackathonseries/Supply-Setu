// controllers/bookingController.js
const SurplusPost = require("../models/SurplusPost");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");

const bookItem = async (req, res) => {
  try {
    const { surplusPostId, supplierId } = req.body;

    const post = await SurplusPost.findById(surplusPostId).populate("vendor");
    const supplier = await User.findById(supplierId);

    if (!post || !supplier) {
      return res.status(404).json({ error: "Invalid booking details." });
    }

    // (Optional) Add deliveryLog entry or mark post as booked
    post.isBooked = true;
    post.bookedBy = supplier._id;
    await post.save();

    // ✅ Send email to Vendor
    await sendEmail(
      post.vendor.email,
      "New Booking Alert",
      `Your surplus item "${post.title}" has been booked by ${supplier.name}.`
    );

    // ✅ Send email to Supplier
    await sendEmail(
      supplier.email,
      "Booking Confirmed",
      `You have successfully booked "${post.title}" from ${post.vendor.name}.`
    );

    res.status(200).json({ message: "Booking successful & emails sent!" });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ error: "Server error during booking." });
  }
};

module.exports = { bookItem };