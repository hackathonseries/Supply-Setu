// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware"); // Your JWT middleware

router.post("/create-order", protect, createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;