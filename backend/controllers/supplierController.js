const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const User = require("../models/User");

exports.addProductAsSupplier = async (req, res) => {
  try {
    const { userId, name, stock, price, description, images } = req.body;

    // Ensure user is a supplier
    const user = await User.findById(userId);
    if (!user || user.role !== "supplier") {
      return res.status(403).json({ message: "Only suppliers can add products" });
    }

    // Create a new product and add this supplier as the first one
    const newProduct = new Product({
      name,
      suppliers: [
        {
          supplier: userId,
          stock,
          price,
          description,
          images,
        },
      ],
    });

    const savedProduct = await newProduct.save();

    // Create or update supplier document
    let supplier = await Supplier.findOne({ userId });
    if (!supplier) {
      supplier = new Supplier({ userId, products: [savedProduct._id] });
    } else {
      supplier.products.push(savedProduct._id);
    }

    await supplier.save();

    res.status(201).json({ message: "Product added", product: savedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateStockAndPrice = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId, stock, price, description } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find supplier entry in this product
    const supplierEntry = product.suppliers.find(
      (entry) => entry.supplier.toString() === userId
    );

    if (!supplierEntry)
      return res.status(403).json({ message: "You are not a supplier of this product" });

    supplierEntry.stock = stock;
    supplierEntry.price = price;
    if (description) supplierEntry.description = description;

    await product.save();
    res.status(200).json({ message: "Stock updated", product });
  } catch (err) {
    res.status(500).json({ message: "Error updating stock", error: err.message });
  }
};