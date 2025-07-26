const Purchase = require('../models/purchase');
const Request = require('../models/request');
const mongoose = require('mongoose');

exports.createRequest = async (req, res) => {
  try {
    const { productName, quantity, description } = req.body;
    const vendorId = req.user._id;

    const request = new Request({
      vendorId,
      productName,
      quantity,
      description,
      status: 'pending'
    });

    const savedRequest = await request.save();
    res.status(201).json({ success: true, request: savedRequest });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating request', error: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const vendorId = req.user._id;
    const requests = await Request.find({ vendorId });
    res.status(200).json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching requests', error: err.message });
  }
};

exports.getMonthlyPurchaseSummary = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const summary = await Purchase.aggregate([
      { $match: { vendorId: new mongoose.Types.ObjectId(vendorId) } },
      {
        $group: {
          _id: { month: { $month: '$purchasedAt' }, year: { $year: '$purchasedAt' } },
          totalQuantity: { $sum: '$quantity' },
          totalSpent: { $sum: '$totalCost' },
        },
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      }
    ]);

    res.status(200).json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching purchase summary', error: err.message });
  }
};

exports.getTopSuppliers = async (req, res) => {
  try {
    const vendorId = req.user._id;

    const topSuppliers = await Purchase.aggregate([
      { $match: { vendorId: new mongoose.Types.ObjectId(vendorId) } },
      {
        $group: {
          _id: '$supplierId',
          totalQuantity: { $sum: '$quantity' },
          totalSpent: { $sum: '$totalCost' },
        },
      },
      {
        $sort: { totalSpent: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'supplierDetails'
        }
      },
      { $unwind: '$supplierDetails' },
    ]);

    res.status(200).json({ success: true, topSuppliers });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching top suppliers', error: err.message });
  }
};