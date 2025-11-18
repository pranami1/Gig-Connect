import Message from "../models/message.js";

// Create message
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const newMessage = new Message({
      conversationId,
      senderId: req.user._id,
      text,
    });

    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

// Get all messages in a conversation
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
