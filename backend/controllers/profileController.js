const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Update personal information
exports.updatePersonalInfo = async (req, res) => {
  try {
    const { name, email, phone, address, city, state, zipCode, country } = req.body;
    const userId = req.user._id;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already in use by another account'
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
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
    );

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Personal information updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Update personal info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update business information
exports.updateBusinessInfo = async (req, res) => {
  try {
    const {
      companyName,
      businessType,
      website,
      description,
      businessHours,
      serviceAreas,
      categories
    } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        companyName,
        businessType,
        website,
        description,
        businessHours,
        serviceAreas,
        categories
      },
      { new: true, runValidators: true }
    );

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Business information updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Update business info error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update account settings
exports.updateAccountSettings = async (req, res) => {
  try {
    const {
      emailNotifications,
      smsNotifications,
      orderUpdates,
      marketingEmails,
      privacySettings
    } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        emailNotifications,
        smsNotifications,
        orderUpdates,
        marketingEmails,
        privacySettings
      },
      { new: true, runValidators: true }
    );

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Account settings updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Update account settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Get user with password
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // In a real application, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll store the file path or URL
    const imageUrl = `/uploads/profile/${req.file.filename}`; // Adjust based on your upload setup

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    );

    // Remove password from response
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Upload profile image error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      user: userResponse
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get public profile (for viewing other users)
exports.getPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Only return public information based on privacy settings
    const publicProfile = {
      _id: user._id,
      name: user.name,
      role: user.role,
      companyName: user.privacySettings?.showBusinessInfo ? user.companyName : null,
      businessType: user.privacySettings?.showBusinessInfo ? user.businessType : null,
      description: user.privacySettings?.showBusinessInfo ? user.description : null,
      businessHours: user.privacySettings?.showBusinessInfo ? user.businessHours : null,
      profileImage: user.profileImage,
      createdAt: user.createdAt
    };

    // Add contact info if allowed
    if (user.privacySettings?.showContactInfo) {
      publicProfile.email = user.email;
      publicProfile.phone = user.phone;
      publicProfile.address = user.address;
      publicProfile.city = user.city;
      publicProfile.state = user.state;
    }

    res.status(200).json({
      success: true,
      user: publicProfile
    });

  } catch (error) {
    console.error('Get public profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 