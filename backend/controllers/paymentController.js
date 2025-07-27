// controllers/paymentController.js
const razorpay = require("../config/razorpay");
const crypto = require("crypto");
const Transaction = require("../models/Transaction");

const createOrder = async (req, res) => {
  try {
    // Check if Razorpay is initialized
    if (!razorpay) {
      return res.status(503).json({ 
        success: false, 
        message: "Payment service is currently unavailable. Please check Razorpay configuration." 
      });
    }

    const { amount, items, seller, transactionId } = req.body;
    const buyer = req.user._id;

    if (!seller) {
      return res.status(400).json({ success: false, message: "Seller ID is required" });
    }

    // Convert amount to paise (Razorpay expects amount in smallest currency unit)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // If transactionId is provided, update the existing transaction
    if (transactionId) {
      await Transaction.findByIdAndUpdate(transactionId, {
        razorpayOrderId: razorpayOrder.id,
        status: "pending"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Razorpay order created successfully",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      transactionId: transactionId
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    // Check if Razorpay is initialized
    if (!razorpay) {
      return res.status(503).json({ 
        success: false, 
        message: "Payment service is currently unavailable. Please check Razorpay configuration." 
      });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transactionId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update the transaction with payment details
      await Transaction.findByIdAndUpdate(transactionId, {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "confirmed",
        $push: {
          statusHistory: {
            status: "confirmed",
            notes: "Payment verified successfully",
            updatedBy: req.user._id
          }
        }
      });

      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(500).json({ success: false, message: "Verification Failed" });
  }
};

module.exports = { createOrder, verifyPayment };