const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/register', getAllUsers);
router.get('/login', getAllUsers);


module.exports = router;