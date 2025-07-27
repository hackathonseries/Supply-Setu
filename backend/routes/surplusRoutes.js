const express = require('express');
const router = express.Router();
const surplusController = require('../controllers/surplusController');
const { protect } = require('../middleware/authMiddleware');

// Anyone logged in can view and book
router.get('/available', protect, surplusController.viewAvailableSurplus);
router.post('/book/:id', protect, surplusController.bookSurplus);

// Only vendors can post surplus
const { isVendor } = require('../middleware/authMiddleware');
router.post('/post', protect, isVendor, surplusController.postSurplus);

// Vendor-specific routes
router.get('/vendor/:vendorId', protect, surplusController.getVendorSurplus);
router.put('/:id', protect, isVendor, surplusController.updateSurplus);
router.delete('/:id', protect, isVendor, surplusController.deleteSurplus);

module.exports = router;