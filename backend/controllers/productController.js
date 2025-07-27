const Product = require('../models/Product');
const User = require('../models/User');

// Create new product
exports.createProduct = async (req, res) => {
  try {
    console.log('Creating product with data:', req.body);
    console.log('User:', req.user);
    
    const supplierId = req.user._id;
    const productData = { ...req.body, supplier: supplierId };

    console.log('Final product data:', productData);

    const product = await Product.create(productData);

    console.log('Product created successfully:', product);

    res.status(201).json({ 
      success: true, 
      message: 'Product created successfully', 
      data: product 
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: error.message,
      details: error.errors 
    });
  }
};

// Get all products (for marketplace)
exports.getAllProducts = async (req, res) => {
  try {
    const { category, supplier, search, sort = 'createdAt', order = 'desc' } = req.query;

    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by supplier
    if (supplier) {
      query.supplier = supplier;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const products = await Product.find(query)
      .populate('supplier', 'name email')
      .sort(sortObj);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get supplier's products
exports.getSupplierProducts = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const products = await Product.find({ supplier: supplierId })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Get supplier products error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId)
      .populate('supplier', 'name email phone');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const supplierId = req.user._id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user is the product owner
    if (product.supplier.toString() !== supplierId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      success: true, 
      message: 'Product updated successfully', 
      data: updatedProduct 
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const supplierId = req.user._id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user is the product owner
    if (product.supplier.toString() !== supplierId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Toggle product active status
exports.toggleProductStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const supplierId = req.user._id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Check if user is the product owner
    if (product.supplier.toString() !== supplierId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({ 
      success: true, 
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`, 
      data: product 
    });

  } catch (error) {
    console.error('Toggle product status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get product categories
exports.getProductCategories = async (req, res) => {
  try {
    const categories = [
      { value: 'raw_materials', label: 'Raw Materials' },
      { value: 'equipment', label: 'Equipment' },
      { value: 'tools', label: 'Tools' },
      { value: 'chemicals', label: 'Chemicals' },
      { value: 'packaging', label: 'Packaging' },
      { value: 'other', label: 'Other' }
    ];

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Get product categories error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get product units
exports.getProductUnits = async (req, res) => {
  try {
    const units = [
      { value: 'kg', label: 'Kilogram (kg)' },
      { value: 'ton', label: 'Ton' },
      { value: 'piece', label: 'Piece' },
      { value: 'liter', label: 'Liter' },
      { value: 'meter', label: 'Meter' },
      { value: 'box', label: 'Box' },
      { value: 'set', label: 'Set' }
    ];

    res.status(200).json({ success: true, data: units });
  } catch (error) {
    console.error('Get product units error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
