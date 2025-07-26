const User = require('../models/User');
const Supplier = require('../models/Supplier');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// new user aka register 
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    // jo input kar rahe hain usko validate kar raha hai 
    if (!name || !email || !phone || !role || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check karega agar email pehle se registered hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // password hashing for secutity
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = await User.create({
      name,
      email,
      phone,
      role: role.toLowerCase(),
      password: hashedPassword,
    });

    // If the user is  supplier, create a Supplier entry
    if (newUser.role === 'supplier') {
      await Supplier.create({
        userId: newUser._id, // Link the supplier to the user
        products: [], // Initialize with an empty products array
      });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
  } catch (err) {
    console.error('Get Users Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};