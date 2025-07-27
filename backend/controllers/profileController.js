const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update personal information
exports.updatePersonalInfo = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zipCode, country } = req.body;

    // Check if email is already taken by another user
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email is already registered' 
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        email,
        phone,
        address,
        city,
        state,
        zipCode,
        country
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: 'Personal information updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating personal info:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update personal information' 
    });
  }
};

// Update business information
exports.updateBusinessInfo = async (req, res) => {
  try {
    const {
      businessName,
      businessType,
      registrationNumber,
      taxId,
      website,
      description,
      specialties,
      certifications
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        businessName,
        businessType,
        registrationNumber,
        taxId,
        website,
        description,
        specialties,
        certifications
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: 'Business information updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating business info:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update business information' 
    });
  }
};

// Update preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { notifications, privacy, language, timezone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        notifications,
        privacy,
        language,
        timezone
      },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ 
      success: true, 
      message: 'Preferences updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update preferences' 
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to change password' 
    });
  }
}; 