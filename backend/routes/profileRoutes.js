const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');

// Personal Information
router.put('/personal', protect, profileController.updatePersonalInfo);

// Business Information
router.put('/business', protect, profileController.updateBusinessInfo);

// Preferences
router.put('/preferences', protect, profileController.updatePreferences);

// Password Change
router.put('/password', protect, profileController.changePassword);

// Get Profile
router.get('/', protect, profileController.getProfile);

module.exports = router; 