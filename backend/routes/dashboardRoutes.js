const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/vendor/:vendorId', dashboardController.getVendorAnalytics);

module.exports = router;