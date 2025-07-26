const DeliveryLog = require("../models/DeliveryLog");
const SurplusPost = require("../models/SurplusPost");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");

// Export all methods as a module
const deliveryController = {};

deliveryController.startDelivery = async (req, res) => {
  try {
    const { surplusPostId, note } = req.body;

    // Create a new delivery log
    const delivery = new DeliveryLog({
      surplusPost: surplusPostId,
      updates: [{
        status: 'Picked Up',
        note: note || 'Delivery started',
        timestamp: new Date()
      }]
    });

    await delivery.save();
    res.status(201).json({ success: true, delivery });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error starting delivery', error: err.message });
  }
};

deliveryController.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    
    const delivery = await DeliveryLog.findById(id);
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }
    
    delivery.updates.push({
      status,
      note: note || `Status updated to ${status}`,
      timestamp: new Date()
    });
    
    await delivery.save();
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating delivery status', error: err.message });
  }
};

deliveryController.myDeliveries = async (req, res) => {
  try {
    // Since we don't have driverId in our schema, we'll get all deliveries
    // In a real app, you might want to filter by user ID in the SurplusPost model
    const deliveries = await DeliveryLog.find()
      .populate('surplusPost')
      .sort({ createdAt: -1 });
      
    res.status(200).json({ success: true, deliveries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching deliveries', error: err.message });
  }
};

deliveryController.updateDeliveryStatus = async (req, res) => {
  try {
    const { postId, newStatus } = req.body;

    const post = await SurplusPost.findById(postId).populate("bookedBy");
    if (!post) return res.status(404).json({ error: "Post not found." });

    // Update delivery log or status (your logic may vary)
    post.deliveryStatus = newStatus;
    await post.save();

    // Send email to supplier
    const supplier = await User.findById(post.bookedBy);
    await sendEmail(
      supplier.email,
      "Delivery Status Update",
      `The item "${post.title}" has been marked as "${newStatus}".`
    );

    res.status(200).json({ message: "Status updated and email sent." });
  } catch (error) {
    res.status(500).json({ error: "Error updating delivery." });
  }
};

module.exports = deliveryController;