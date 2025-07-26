const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const productRoutes = require("./routes/productRoute");

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
app.use("/api/product", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is running at http://localhost:${PORT}`);
});
