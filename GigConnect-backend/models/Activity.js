import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lastPage: { type: String },
  progress: { type: Object },
  updatedAt: { type: Date, default: Date.now },
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
