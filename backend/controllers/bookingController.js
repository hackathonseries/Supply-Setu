// controllers/bookingController.js
const SurplusPost = require("../models/SurplusPost");
const User = require("../models/User");
const Booking = require("../models/Booking");
const sendEmail = require("../utils/emailService");

const bookItem = async (req, res) => {
  try {
    const { surplusPostId, supplierId } = req.body;

    const post = await SurplusPost.findById(surplusPostId).populate("vendor");
    const supplier = await User.findById(supplierId);

    if (!post || !supplier) {
      return res.status(404).json({ error: "Invalid booking details." });
    }

    // Create booking record
    const booking = await Booking.create({
      surplusPost: surplusPostId,
      vendor: post.vendor._id,
      bookedBy: supplierId,
      status: 'pending'
    });

    // Mark post as booked
    post.isBooked = true;
    post.bookedBy = supplier._id;
    await post.save();

    // ✅ Send email to Vendor
    await sendEmail(
      post.vendor.email,
      "New Booking Alert",
      `Your surplus item "${post.materialType}" has been booked by ${supplier.name}.`
    );

    // ✅ Send email to Supplier
    await sendEmail(
      supplier.email,
      "Booking Confirmed",
      `You have successfully booked "${post.materialType}" from ${post.vendor.name}.`
    );

    res.status(200).json({ message: "Booking successful & emails sent!", data: booking });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(500).json({ error: "Server error during booking." });
  }
};

// Get vendor's bookings
const getVendorBookings = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const bookings = await Booking.find({ vendor: vendorId })
      .populate('surplusPost', 'materialType quantity pricePerUnit location')
      .populate('bookedBy', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error("❌ Get vendor bookings error:", error);
    res.status(500).json({ error: "Server error while fetching bookings." });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId).populate('surplusPost vendor bookedBy');
    
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Check if user is the vendor of this booking
    if (booking.vendor._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to update this booking." });
    }

    booking.status = status;
    await booking.save();

    // Send email notification to supplier
    if (status === 'confirmed') {
      await sendEmail(
        booking.bookedBy.email,
        "Booking Confirmed",
        `Your booking for "${booking.surplusPost.materialType}" has been confirmed by ${booking.vendor.name}.`
      );
    } else if (status === 'cancelled') {
      await sendEmail(
        booking.bookedBy.email,
        "Booking Cancelled",
        `Your booking for "${booking.surplusPost.materialType}" has been cancelled by ${booking.vendor.name}.`
      );
    }

    res.status(200).json({ message: "Booking status updated successfully", data: booking });
  } catch (error) {
    console.error("❌ Update booking status error:", error);
    res.status(500).json({ error: "Server error while updating booking status." });
  }
};

module.exports = { bookItem, getVendorBookings, updateBookingStatus };