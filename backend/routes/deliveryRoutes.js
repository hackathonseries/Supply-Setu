const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const { protect, isVendor, isSupplier } = require('../middleware/authMiddleware');

const router = express.Router();

// Create delivery (supplier only)
router.post('/create', protect, isSupplier, deliveryController.createDelivery);

// Update delivery status (vendor or supplier)
router.patch('/:deliveryId/status', protect, deliveryController.updateDeliveryStatus);

// Get vendor's deliveries
router.get('/vendor/:vendorId', protect, deliveryController.getVendorDeliveries);

// Get supplier's deliveries
router.get('/supplier/:supplierId', protect, deliveryController.getSupplierDeliveries);

// Get delivery details
router.get('/:deliveryId', protect, deliveryController.getDeliveryDetails);

// Add document to delivery
router.post('/:deliveryId/documents', protect, deliveryController.addDeliveryDocument);

module.exports = router;
