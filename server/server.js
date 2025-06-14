require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();
app.use('/api/subscriptions/webhook', express.raw({ type: 'application/json' }));
const imageRoutes = require("./routes/imageRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const audioRoutes = require("./routes/audioRoutes");
const videoRoutes = require("./routes/videoRoutes");

app.use(cors());
app.use(express.json({ limit: process.env.MAX_FILE_SIZE }));
app.use(express.urlencoded({ extended: true }));

// Static folder for serving HTML image screenshots
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api", imageRoutes);
app.use("/api/audio", audioRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
