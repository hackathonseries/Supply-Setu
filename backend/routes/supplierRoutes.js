const express = require("express");
const {
  addProductAsSupplier,
  updateStockAndPrice,
} = require("../controllers/supplierController");

const router = express.Router();

// POST: Add product (supplier adds product with stock/price/images)
router.post("/product", addProductAsSupplier);

// PUT: Update stock and price
router.put("/stock/:productId", updateStockAndPrice);

module.exports = router;