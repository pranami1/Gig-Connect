// routes/profileRoutes.js
import express from "express";
import {
  getMyProfile,
  createOrUpdateProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfileAndUser,
} from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Protected routes
router.get("/me", protect, getMyProfile);
router.post("/me", protect, createOrUpdateProfile);
router.put("/me", protect, createOrUpdateProfile);
router.delete("/", protect, deleteProfileAndUser);

// Public
router.get("/", getAllProfiles);
router.get("/user/:userId", getProfileByUserId);

router.get("/me", protect, getMyProfile);
router.post("/me", protect, upload.single("avatar"), createOrUpdateProfile);
export default router;
