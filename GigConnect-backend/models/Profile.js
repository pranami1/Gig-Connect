// models/Profile.js
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String },
  company: { type: String },
  from: { type: Date },
  to: { type: Date },
  current: { type: Boolean, default: false },
  description: { type: String },
});

const portfolioSchema = new mongoose.Schema({
  title: { type: String },
  url: { type: String },
});

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
    },
    bio: { type: String },
    skills: { type: [String], default: [] }, // array of skill strings
    location: { type: String },
    hourlyRate: { type: Number },
    social: {
      website: { type: String },
      linkedin: { type: String },
      github: { type: String },
      twitter: { type: String },
    },
    photo: String,
    experience: [experienceSchema],
    portfolio: [portfolioSchema],
  
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
