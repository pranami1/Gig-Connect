import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Activity from "../models/Activity.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc   Register user
// @route  POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// @desc   Login user & get token
// @route  POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in user" });
  }
});

// @desc   Get user profile
// @route  GET /api/users/profile
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

// @desc   Save user activity
// @route  POST /api/users/save-activity
router.post("/save-activity", protect, async (req, res) => {
  try {
    const { lastPage, progress } = req.body;

    let activity = await Activity.findOne({ userId: req.user._id });
    if (!activity) {
      activity = new Activity({ userId: req.user._id, lastPage, progress });
    } else {
      activity.lastPage = lastPage;
      activity.progress = progress;
      activity.updatedAt = Date.now();
    }

    await activity.save();
    res.json({ message: "Activity saved", activity });
  } catch (err) {
    res.status(500).json({ message: "Error saving activity" });
  }
});

// @desc   Get user activity
// @route  GET /api/users/get-activity
router.get("/get-activity", protect, async (req, res) => {
  try {
    const activity = await Activity.findOne({ userId: req.user._id });
    if (!activity) return res.json({ message: "No activity found" });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: "Error fetching activity" });
  }
});

export default router;
