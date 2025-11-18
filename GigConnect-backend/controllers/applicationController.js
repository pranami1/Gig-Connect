import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Apply to a job
export const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "Freelancer") {
      return res.status(403).json({ message: "Only freelancers can apply" });
    }

    const { jobId } = req.params;
    const { coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await Application.findOne({
      job: jobId,
      freelancer: req.user._id,
    });
    if (existing)
      return res.status(400).json({ message: "Already applied to this job" });

    const application = await Application.create({
      job: jobId,
      freelancer: req.user._id,
      coverLetter,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applicants (for job owner)
export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    const applications = await Application.find({ job: jobId }).populate(
      "freelancer",
      "name email"
    );

    console.log("Applications fetched for jobId:", jobId, applications);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(appId).populate("job");
    if (!application)
      return res.status(404).json({ message: "Application not found" });

    if (application.job.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this application" });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications of logged-in freelancer
export const getFreelancerApplications = async (req, res) => {
  try {
    if (req.user.role !== "Freelancer") {
      return res
        .status(403)
        .json({ message: "Only freelancers can view their applications" });
    }

    const applications = await Application.find({ freelancer: req.user._id }).populate({
      path: "job",
      populate: { path: "createdBy", select: "name email" }, // client info
    });

    res.json(applications);
  } catch (error) {
    console.error("Error in getFreelancerApplications:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all applications for jobs created by logged-in client
export const getClientApplications = async (req, res) => {
  try {
    if (req.user.role !== "Client") {
      return res.status(403).json({ message: "Only clients can view this" });
    }

    // Get all jobs created by this client
    const jobs = await Job.find({ createdBy: req.user._id }).select("_id title");
    const jobIds = jobs.map((job) => job._id);

    // Get all applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("freelancer", "name email")
      .populate("job", "title");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

// Get only accepted applications for jobs of logged-in client
export const getAcceptedApplications = async (req, res) => {
  try {
    if (req.user.role !== "Client") {
      return res.status(403).json({ message: "Only clients can view this" });
    }

    // Get all jobs created by this client
    const jobs = await Job.find({ createdBy: req.user._id }).select("_id title");
    const jobIds = jobs.map((job) => job._id);

    // Get applications with status "accepted"
    const applications = await Application.find({
      job: { $in: jobIds },
      status: "accepted",
    })
      .populate("freelancer", "name email")
      .populate("job", "title");

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch accepted applications" });
  }
};
