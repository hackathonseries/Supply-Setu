const Transaction = require('../models/Transaction');
const SurplusPost = require('../models/SurplusPost');
const Product = require('../models/Product');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// Create surplus exchange transaction (vendor books surplus from another vendor)
exports.createSurplusTransaction = async (req, res) => {
  try {
    const { surplusPostId } = req.body;
    const buyerId = req.user._id;

    // Find the surplus post
    const surplusPost = await SurplusPost.findById(surplusPostId)
      .populate('vendor');

    if (!surplusPost) {
      return res.status(404).json({ success: false, message: 'Surplus post not found' });
    }

    // Check if surplus is still available
    if (surplusPost.isBooked) {
      return res.status(400).json({ success: false, message: 'Surplus is already booked' });
    }

    // Check if buyer is not the seller
    if (surplusPost.vendor._id.toString() === buyerId.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot book your own surplus' });
    }

    // Calculate total amount
    const totalAmount = surplusPost.quantity * surplusPost.pricePerUnit;

    // Create transaction
    const transaction = await Transaction.create({
      transactionType: 'surplus_exchange',
      surplusPost: surplusPostId,
      seller: surplusPost.vendor._id,
      buyer: buyerId,
      totalAmount,
      surplusDetails: {
        materialType: surplusPost.materialType,
        quantity: surplusPost.quantity,
        pricePerUnit: surplusPost.pricePerUnit,
        location: surplusPost.location
      },
      statusHistory: [{
        status: 'pending',
        notes: 'Transaction created',
        updatedBy: buyerId
      }]
    });

    // Update surplus post status
    surplusPost.isBooked = true;
    surplusPost.bookedBy = buyerId;
    await surplusPost.save();

    // Send email notifications
    await sendEmail(
      surplusPost.vendor.email,
      'Surplus Booked',
      `Your surplus item "${surplusPost.materialType}" has been booked by ${req.user.name}.`
    );

    await sendEmail(
      req.user.email,
      'Surplus Booking Confirmed',
      `You have successfully booked "${surplusPost.materialType}" from ${surplusPost.vendor.name}.`
    );

    res.status(201).json({ 
      success: true, 
      message: 'Surplus booked successfully', 
      data: transaction 
    });

  } catch (error) {
    console.error('Create surplus transaction error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Create supplier order transaction
exports.createSupplierOrder = async (req, res) => {
  try {
    const { products, orderDetails } = req.body;
    const buyerId = req.user._id;

    console.log('Request body:', req.body);
    console.log('User:', req.user);

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: 'No products selected or invalid format' });
    }

    // Validate each product has required fields
    for (const item of products) {
      if (!item.productId || !item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: 'Each product must have productId and quantity' 
        });
      }
    }

    // Validate products and calculate total
    let totalAmount = 0;
    const validatedProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product ${item.productId} not found` });
      }

      if (!product.isActive) {
        return res.status(400).json({ success: false, message: `Product ${product.name} is not available` });
      }

      if (item.quantity < product.minimumOrderQuantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Minimum order quantity for ${product.name} is ${product.minimumOrderQuantity}` 
        });
      }

      if (item.quantity > product.stockQuantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient stock for ${product.name}. Available: ${product.stockQuantity}` 
        });
      }

      const itemTotal = item.quantity * product.price;
      totalAmount += itemTotal;

      validatedProducts.push({
        product: product._id,
        quantity: item.quantity,
        unitPrice: product.price
      });
    }

    // Get the supplier ID from the first product
    const firstProduct = await Product.findById(validatedProducts[0].product);
    const supplierId = firstProduct.supplier;

    // Create transaction
    const transaction = await Transaction.create({
      transactionType: 'supplier_order',
      supplierProducts: validatedProducts,
      seller: supplierId,
      buyer: buyerId,
      totalAmount,
      orderDetails,
      statusHistory: [{
        status: 'pending',
        notes: 'Order placed',
        updatedBy: buyerId
      }]
    });

    // Update product stock
    for (const item of validatedProducts) {
      const product = await Product.findById(item.product);
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    // Send email notifications
    const supplier = await User.findById(supplierId);
    await sendEmail(
      supplier.email,
      'New Order Received',
      `You have received a new order from ${req.user.name} for $${totalAmount}.`
    );

    await sendEmail(
      req.user.email,
      'Order Confirmed',
      `Your order has been placed successfully. Total amount: $${totalAmount}.`
    );

    res.status(201).json({ 
      success: true, 
      message: 'Order placed successfully', 
      data: transaction 
    });

  } catch (error) {
    console.error('Create supplier order error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { status, notes } = req.body;
    const userId = req.user._id;

    const transaction = await Transaction.findById(transactionId)
      .populate('seller')
      .populate('buyer')
      .populate('surplusPost');

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Check if user is authorized to update this transaction
    const isSeller = transaction.seller._id.toString() === userId.toString();
    const isBuyer = transaction.buyer._id.toString() === userId.toString();

    if (!isSeller && !isBuyer) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this transaction' });
    }

    // Update status
    transaction.status = status;
    transaction.statusHistory.push({
      status,
      notes: notes || `Status updated to ${status}`,
      updatedBy: userId
    });

    await transaction.save();

    // Send email notifications
    const statusEmails = {
      'confirmed': {
        subject: 'Order Confirmed',
        message: 'Your order has been confirmed by the seller.'
      },
      'processing': {
        subject: 'Order Processing',
        message: 'Your order is now being processed.'
      },
      'shipped': {
        subject: 'Order Shipped',
        message: 'Your order has been shipped.'
      },
      'delivered': {
        subject: 'Order Delivered',
        message: 'Your order has been delivered successfully.'
      },
      'cancelled': {
        subject: 'Order Cancelled',
        message: 'Your order has been cancelled.'
      }
    };

    if (statusEmails[status]) {
      await sendEmail(
        transaction.buyer.email,
        statusEmails[status].subject,
        statusEmails[status].message
      );
    }

    res.status(200).json({ 
      success: true, 
      message: 'Transaction status updated successfully', 
      data: transaction 
    });

  } catch (error) {
    console.error('Update transaction status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get vendor's transactions (as buyer)
exports.getVendorTransactions = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { type } = req.query;

    let query = { buyer: vendorId };
    if (type) {
      query.transactionType = type;
    }

    const transactions = await Transaction.find(query)
      .populate('seller', 'name email')
      .populate('surplusPost')
      .populate('supplierProducts.product')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error('Get vendor transactions error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get supplier's transactions (as seller)
exports.getSupplierTransactions = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const transactions = await Transaction.find({ seller: supplierId })
      .populate('buyer', 'name email')
      .populate('surplusPost')
      .populate('supplierProducts.product')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error('Get supplier transactions error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get transaction details
exports.getTransactionDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId)
      .populate('seller', 'name email phone')
      .populate('buyer', 'name email phone')
      .populate('surplusPost')
      .populate('supplierProducts.product')
      .populate('statusHistory.updatedBy', 'name');

    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.error('Get transaction details error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add message to transaction
exports.addTransactionMessage = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    transaction.messages.push({
      sender: senderId,
      message
    });

    await transaction.save();

    res.status(200).json({ 
      success: true, 
      message: 'Message added successfully', 
      data: transaction 
    });

  } catch (error) {
    console.error('Add transaction message error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}; 