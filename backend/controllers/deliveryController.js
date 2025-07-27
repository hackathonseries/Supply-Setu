const Delivery = require('../models/Delivery');
const Booking = require('../models/Booking');
const SurplusPost = require('../models/SurplusPost');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

// Supplier creates a delivery request
exports.createDelivery = async (req, res) => {
  try {
    const { bookingId, pickupDetails, deliveryDetails } = req.body;
    const supplierId = req.user._id;

    // Find the booking
    const booking = await Booking.findById(bookingId)
      .populate('surplusPost vendor')
      .populate('bookedBy');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user is the supplier who made the booking
    if (booking.bookedBy._id.toString() !== supplierId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to create delivery for this booking' });
    }

    // Check if booking is confirmed
    if (booking.status !== 'confirmed') {
      return res.status(400).json({ success: false, message: 'Booking must be confirmed before creating delivery' });
    }

    // Check if delivery already exists
    const existingDelivery = await Delivery.findOne({ booking: bookingId });
    if (existingDelivery) {
      return res.status(400).json({ success: false, message: 'Delivery already exists for this booking' });
    }

    // Create delivery
    const delivery = await Delivery.create({
      booking: bookingId,
      surplusPost: booking.surplusPost._id,
      vendor: booking.vendor._id,
      supplier: supplierId,
      pickupDetails,
      deliveryDetails
    });

    // Add notification
    delivery.notifications.push({
      type: 'pickup_scheduled',
      message: `Delivery scheduled for ${booking.surplusPost.materialType} on ${new Date(pickupDetails.scheduledDate).toLocaleDateString()}`,
      sentTo: 'both'
    });

    await delivery.save();

    // Send email notifications
    await sendEmail(
      booking.vendor.email,
      'New Delivery Request',
      `A delivery has been scheduled for your surplus item "${booking.surplusPost.materialType}" by ${booking.bookedBy.name}. Pickup scheduled for ${new Date(pickupDetails.scheduledDate).toLocaleDateString()}.`
    );

    await sendEmail(
      booking.bookedBy.email,
      'Delivery Request Created',
      `Your delivery request for "${booking.surplusPost.materialType}" has been created successfully. Pickup scheduled for ${new Date(pickupDetails.scheduledDate).toLocaleDateString()}.`
    );

    res.status(201).json({ 
      success: true, 
      message: 'Delivery created successfully', 
      data: delivery 
    });

  } catch (error) {
    console.error('Create delivery error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { status, notes } = req.body;
    const userId = req.user._id;

    const delivery = await Delivery.findById(deliveryId)
      .populate('booking')
      .populate('surplusPost')
      .populate('vendor')
      .populate('supplier');

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    // Check if user is authorized (vendor or supplier)
    if (delivery.vendor._id.toString() !== userId.toString() && 
        delivery.supplier._id.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this delivery' });
    }

    const oldStatus = delivery.status;
    delivery.status = status;

    // Add tracking notes if provided
    if (notes) {
      delivery.tracking.driverNotes = notes;
    }

    // Update tracking times based on status
    if (status === 'picked_up') {
      delivery.tracking.actualPickupTime = new Date();
    } else if (status === 'delivered') {
      delivery.tracking.actualDeliveryTime = new Date();
    }

    // Add notification
    const notificationMessages = {
      'in_progress': 'Delivery is now in progress',
      'picked_up': 'Item has been picked up',
      'delivered': 'Item has been delivered successfully',
      'cancelled': 'Delivery has been cancelled'
    };

    if (notificationMessages[status]) {
      delivery.notifications.push({
        type: status,
        message: notificationMessages[status],
        sentTo: 'both'
      });
    }

    await delivery.save();

    // Send email notifications
    const statusEmails = {
      'in_progress': {
        subject: 'Delivery In Progress',
        message: `Your delivery for "${delivery.surplusPost.materialType}" is now in progress.`
      },
      'picked_up': {
        subject: 'Item Picked Up',
        message: `Your item "${delivery.surplusPost.materialType}" has been picked up successfully.`
      },
      'delivered': {
        subject: 'Delivery Completed',
        message: `Your delivery for "${delivery.surplusPost.materialType}" has been completed successfully.`
      },
      'cancelled': {
        subject: 'Delivery Cancelled',
        message: `Your delivery for "${delivery.surplusPost.materialType}" has been cancelled.`
      }
    };

    if (statusEmails[status]) {
      await sendEmail(
        delivery.vendor.email,
        statusEmails[status].subject,
        statusEmails[status].message
      );

      await sendEmail(
        delivery.supplier.email,
        statusEmails[status].subject,
        statusEmails[status].message
      );
    }

    res.status(200).json({ 
      success: true, 
      message: 'Delivery status updated successfully', 
      data: delivery 
    });

  } catch (error) {
    console.error('Update delivery status error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get vendor's deliveries
exports.getVendorDeliveries = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const deliveries = await Delivery.find({ vendor: vendorId })
      .populate('booking')
      .populate('surplusPost', 'materialType quantity pricePerUnit')
      .populate('supplier', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    console.error('Get vendor deliveries error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get supplier's deliveries
exports.getSupplierDeliveries = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const deliveries = await Delivery.find({ supplier: supplierId })
      .populate('booking')
      .populate('surplusPost', 'materialType quantity pricePerUnit')
      .populate('vendor', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: deliveries });
  } catch (error) {
    console.error('Get supplier deliveries error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get single delivery details
exports.getDeliveryDetails = async (req, res) => {
  try {
    const { deliveryId } = req.params;

    const delivery = await Delivery.findById(deliveryId)
      .populate('booking')
      .populate('surplusPost')
      .populate('vendor', 'name email phone')
      .populate('supplier', 'name email phone');

    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    res.status(200).json({ success: true, data: delivery });
  } catch (error) {
    console.error('Get delivery details error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Add document to delivery
exports.addDeliveryDocument = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const { type, url } = req.body;

    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    delivery.documents.push({ type, url });
    await delivery.save();

    res.status(200).json({ 
      success: true, 
      message: 'Document added successfully', 
      data: delivery 
    });

  } catch (error) {
    console.error('Add delivery document error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};