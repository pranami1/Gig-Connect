// controllers/profileController.js
import Profile from "../models/Profile.js";
import User from "../models/User.js";

// GET /api/profile/me
export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      "name email role"
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST/PUT /api/profile/me
export const createOrUpdateProfile = async (req, res) => {
  try {
    console.log("🟢 Incoming request body:", req.body);
    console.log("🟢 Logged in user:", req.user);

    const {
      bio,
      skills,
      location,
      hourlyRate,
      social, // expected object { linkedin, github, website, ... }
      experience,
      portfolio,
    } = req.body;

    const profileFields = { user: req.user?._id }; // make sure user exists

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - No user in request" });
    }

    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    if (hourlyRate !== undefined) profileFields.hourlyRate = hourlyRate;

    if (skills) {
      profileFields.skills = Array.isArray(skills)
        ? skills.map((s) => s.trim())
        : skills.split(",").map((s) => s.trim());
    }

    if (social && typeof social === "object") profileFields.social = social;
    if (Array.isArray(experience)) profileFields.experience = experience;
    if (Array.isArray(portfolio)) profileFields.portfolio = portfolio;

    if (req.file) {
  profileFields.photo = `/uploads/${req.file.filename}`;
}

    console.log("🟢 Final profileFields to save:", profileFields);

    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true, upsert: true }
      ).populate("user", "name email role");

      console.log("🟢 Profile updated successfully");
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    await profile.populate("user", "name email role");

    console.log("🟢 Profile created successfully");
    res.status(201).json(profile);
  } catch (error) {
    console.error("🔴 Error in createOrUpdateProfile:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET /api/profile
export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email role");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/profile/user/:userId
export const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId }).populate(
      "user",
      "name email role"
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/profile  (delete profile + user)
export const deleteProfileAndUser = async (req, res) => {
  try {
    // remove profile
    await Profile.findOneAndRemove({ user: req.user._id });
    // remove user
    await User.findByIdAndRemove(req.user._id);

    res.json({ message: "User and profile removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
