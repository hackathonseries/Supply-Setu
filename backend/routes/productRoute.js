const express = require("express");
const {
  createProduct,
  allProducts,
  getSingleProduct,
} = require("../controllers/productController");
const router = express.Router();    

router.post("/product/create", createProduct);
router.get("/product/all", allProducts);
router.get("/product/:id", getSingleProduct);

module.exports = router;
