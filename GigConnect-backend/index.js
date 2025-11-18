import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js"; // ✅ added
import messageRoutes from "./routes/messageRoutes.js"; //new

// Import mongoose to test DB
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors({
  origin: "https://gig-connect-inky.vercel.app", 
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(express.json());


// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});



// Test Schema
const testSchema = new mongoose.Schema({
  name: String,
});

const TestUser = mongoose.model("TestUser", testSchema);

// Save a test user
app.get("/test-save", async (req, res) => {
  try {
    const user = new TestUser({ name: "Pranami" });
    await user.save();
    res.send("✅ Test user saved to MongoDB!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error saving test user");
  }
});

// Fetch all test users
app.get("/test-users", async (req, res) => {
  try {
    const users = await TestUser.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Error fetching users");
  }
});

// Auth routes
app.use("/api/auth", authRoutes);
// Profile routes
app.use("/api/profile", profileRoutes);
// Job routes
app.use("/api/jobs", jobRoutes);
// Application routes
app.use("/api/applications", applicationRoutes);

// ✅ Conversation routes (new)
app.use("/api/conversations", conversationRoutes);

//messages(new)
app.use("/api/messages", messageRoutes);

// app.use("/uploads", express.static("uploads"));


app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
