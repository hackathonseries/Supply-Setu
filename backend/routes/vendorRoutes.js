const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const { protect, isVendor } = require('../middleware/authMiddleware');
const { getMonthlyPurchaseSummary, getTopSuppliers } = require('../controllers/vendorController');
// All vendor routes go through authentication and role check

router.post('/request', protect, isVendor, vendorController.createRequest);
router.get('/my-requests', protect, isVendor, vendorController.getMyRequests);
router.get('/analytics/monthly-summary', protect, getMonthlyPurchaseSummary);
router.get('/analytics/top-suppliers', protect, getTopSuppliers);

module.exports = router;