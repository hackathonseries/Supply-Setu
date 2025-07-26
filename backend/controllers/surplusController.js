const SurplusPost = require('../models/SurplusPost');

// Vendor posts a surplus
exports.postSurplus = async (req, res) => {
  try {
    const { materialType, quantity, pricePerUnit, location, expiryHours } = req.body;

    const expiryTime = new Date(Date.now() + expiryHours * 60 * 60 * 1000);

    const surplus = await SurplusPost.create({
      vendor: req.user._id,
      materialType,
      quantity,
      pricePerUnit,
      location,
      expiryTime
    });

    res.status(201).json({ success: true, message: 'Surplus posted', data: surplus });
  } catch (err) {
    console.error('Post surplus error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// View all available surplus
exports.viewAvailableSurplus = async (req, res) => {
  try {
    const surplusList = await SurplusPost.find({
      isBooked: false,
      expiryTime: { $gt: new Date() }
    })
    .populate('vendor', 'name email')
    .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: surplusList });
  } catch (err) {
    console.error('Fetch surplus error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Book a surplus item
exports.bookSurplus = async (req, res) => {
  try {
    const { id } = req.params;

    const surplus = await SurplusPost.findById(id);
    if (!surplus) return res.status(404).json({ success: false, message: 'Surplus not found' });
    if (surplus.isBooked || surplus.expiryTime < new Date()) {
      return res.status(400).json({ success: false, message: 'Surplus unavailable or expired' });
    }

    surplus.isBooked = true;
    surplus.bookedBy = req.user._id;
    await surplus.save();

    res.status(200).json({ success: true, message: 'Surplus booked successfully', data: surplus });
  } catch (err) {
    console.error('Book surplus error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};