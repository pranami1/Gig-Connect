import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  applyToJob,
  getApplicants,
  updateApplicationStatus,
  getFreelancerApplications,  //new import
  getClientApplications, //new
  getAcceptedApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/:jobId", protect, applyToJob);
router.get("/:jobId", protect, getApplicants);
router.patch("/:appId/status", protect, updateApplicationStatus);

//new ROUTE for freelancer's own applications
router.get("/freelancer/me", protect, getFreelancerApplications);

//new
router.get("/client/me", protect, getClientApplications);

//new 
router.get("/client/accepted", protect, getAcceptedApplications);

export default router;



