import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: String },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, // new
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
