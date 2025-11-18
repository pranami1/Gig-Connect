import Conversation from "../models/Conversation.js";
import Application from "../models/Application.js";
import Job from "../models/Job.js";


// Freelancer: get conversations for applied jobs
export const getFreelancerConversations = async (req, res) => {
  try {
    const freelancerId = req.user._id;

    // Get all jobs freelancer applied to
    const appliedJobs = await Application.find({ freelancer: freelancerId }).select("job");
    const jobIds = appliedJobs.map((app) => app.job);

    if (jobIds.length === 0) {
      return res.status(200).json([]); // No applied jobs, no conversations
    }

    // Get all clients for those jobs
    const jobs = await Job.find({ _id: { $in: jobIds } }).select("createdBy");
    const clientIds = jobs.map((job) => job.createdBy.toString());

    // Find conversations between freelancer and clients
    const conversations = await Conversation.find({
      participants: { $all: [freelancerId] },
      participants: { $in: clientIds },
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch freelancer conversations" });
  }
};


// Client: get conversations for their jobs
export const getClientConversations = async (req, res) => {
  try {
    const clientId = req.user._id;

    // Get all jobs created by client
    const jobs = await Job.find({ createdBy: clientId }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    // Get all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } }).select("freelancer");
    const freelancerIds = applications.map((app) => app.freelancer.toString());

    // Find conversations between client and freelancers
    const conversations = await Conversation.find({
      participants: clientId,
      participants: { $in: freelancerIds },
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch client conversations" });
  }
};


// Create conversation
export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Check if conversation exists
    const existing = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (existing) return res.status(200).json(existing);

    const newConversation = new Conversation({ participants: [senderId, receiverId] });
    const savedConversation = await newConversation.save();

    res.status(201).json(savedConversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating conversation" });
  }
};

// Get all conversations for logged-in user
export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      participants: userId,
    }).sort({ updatedAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch conversations" });
  }
};


// Get single conversation
export const getSingleConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) return res.status(404).json({ message: "Conversation not found" });

    res.status(200).json(conversation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching conversation" });
  }
};

// Update conversation
export const updateConversation = async (req, res) => {
  try {
    const updated = await Conversation.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    if (!updated) return res.status(404).json({ message: "Conversation not found" });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update conversation" });
  }
};


