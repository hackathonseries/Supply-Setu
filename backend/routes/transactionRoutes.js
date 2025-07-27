const express = require('express');
const transactionController = require('../controllers/transactionController');
const { protect, isVendor, isSupplier } = require('../middleware/authMiddleware');

const router = express.Router();

// Surplus Exchange Routes
router.post('/surplus/book', protect, isVendor, transactionController.createSurplusTransaction);

// Supplier Order Routes
router.post('/supplier/order', protect, isVendor, transactionController.createSupplierOrder);

// Transaction Management Routes
router.patch('/:transactionId/status', protect, transactionController.updateTransactionStatus);
router.get('/vendor/:vendorId', protect, transactionController.getVendorTransactions);
router.get('/supplier/:supplierId', protect, transactionController.getSupplierTransactions);
router.get('/:transactionId', protect, transactionController.getTransactionDetails);
router.post('/:transactionId/message', protect, transactionController.addTransactionMessage);

module.exports = router; 