const express = require('express');
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// All routes are protected
router.use(protect);

// Profile management routes
router.put('/personal', profileController.updatePersonalInfo);
router.put('/business', profileController.updateBusinessInfo);
router.put('/settings', profileController.updateAccountSettings);
router.put('/password', profileController.changePassword);
router.put('/image', upload.single('profileImage'), profileController.uploadProfileImage);
router.get('/me', profileController.getUserProfile);

// Public profile route (for viewing other users)
router.get('/:userId', profileController.getPublicProfile);

module.exports = router; 