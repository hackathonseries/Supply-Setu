const express = require('express');
const productController = require('../controllers/productController');
const { protect, isSupplier } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes (for marketplace)
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getProductCategories);
router.get('/units', productController.getProductUnits);
router.get('/:productId', productController.getProduct);

// Supplier routes (protected)
router.post('/', protect, isSupplier, productController.createProduct);
router.get('/supplier/:supplierId', protect, productController.getSupplierProducts);
router.put('/:productId', protect, isSupplier, productController.updateProduct);
router.delete('/:productId', protect, isSupplier, productController.deleteProduct);
router.patch('/:productId/toggle', protect, isSupplier, productController.toggleProductStatus);

module.exports = router; 