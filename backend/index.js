const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const productRoutes = require("./routes/productRoute");
const vendorRoutes = require('./routes/vendorRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const surplusRoutes = require('./routes/surplusRoutes');
const startExpiryScheduler = require('./utils/expiryScheduler');
const startDailyBroadcast = require('./utils/dailyBroadcast');
const deliveryLogRoutes = require('./routes/deliveryLogRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const bookingRoutes = require("./routes/bookingRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (no deprecated options)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is working and connected to MongoDB!");
});

// Auth Routes
app.use("/api/auth", authRoutes); // Enable /api/auth/register and /api/auth/login endpoints
app.use("/api", productRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/surplus', surplusRoutes);
startExpiryScheduler();
startDailyBroadcast();
app.use('/api/delivery/logs', deliveryLogRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api/bookings", bookingRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
});
