const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, supplierId, stock } = req.body;

    // Validate required fields
    if (!name || !price || !supplierId || !stock) {
      return res
        .status(400)
        .json({ message: "Name, price, supplierId, and stock are required." });
    }

    // Check if the supplier exists
    const supplier = await Supplier.findOne({ userId: supplierId });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    // Check if a product with the same name already exists
    let product = await Product.findOne({ name });

    if (product) {
      // If the product exists, check if the supplier is already associated
      const isSupplierAssociated = product.suppliers.some(
        (supplierEntry) => supplierEntry.supplier.toString() === supplierId
      );

      if (isSupplierAssociated) {
        return res.status(400).json({
          message: "Supplier is already associated with this product.",
        });
      }

      // Add the supplier, price, description, and stock to the existing product
      product.suppliers.push({
        supplier: supplierId,
        stock,
        price,
        description,
      });
    } else {
      // If the product doesn't exist, create a new one
      product = new Product({
        name,
        suppliers: [{ supplier: supplierId, stock, price, description }],
      });
    }

    // Save the product to the database
    const savedProduct = await product.save();

    // Add the product to the supplier's list of products
    supplier.products.push(savedProduct._id);
    await supplier.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create or update product." });
  }
};

exports.allProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (error) {
    console.error("Get Users Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
