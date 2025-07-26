const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Start delivery
router.post('/start', protect, deliveryController.startDelivery);

// Update delivery status
router.patch('/update/:id', protect, deliveryController.updateStatus);

// View my deliveries
router.get('/my', protect, deliveryController.myDeliveries);

module.exports = router;
