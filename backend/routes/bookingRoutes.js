const express = require("express");
const router = express.Router();
const { bookItem, getVendorBookings, updateBookingStatus } = require("../controllers/bookingController");
const { protect, isVendor } = require("../middleware/authMiddleware");

router.post("/book", bookItem);

// Vendor booking management
router.get("/vendor/:vendorId", protect, getVendorBookings);
router.patch("/:bookingId/status", protect, isVendor, updateBookingStatus);

module.exports = router;