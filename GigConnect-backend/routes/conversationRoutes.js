import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
  getFreelancerConversations,
  getClientConversations,
} from "../controllers/conversationController.js";

const router = express.Router();

router.get("/freelancer", protect, getFreelancerConversations);
router.get("/client", protect, getClientConversations);

// General routes
router.get("/single/:id", protect, getSingleConversation);
router.get("/", protect, getConversations);
router.post("/", protect, createConversation);
router.put("/:id", protect, updateConversation);

export default router;
