import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    if (!jobId) {
      return res
        .status(404)
        .json({ message: "Job id not found.", success: false });
    }

    // check if user already applied for a particular job
    const isAlredayApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (isAlredayApplied) {
      return res.status(200).json({
        message: "You already applied for this Job.",
        success: true,
      });
    }
    // is job not exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not Found.",
        success: false,
      });
    }

    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    res.status(201).json({
      message:"Applied successfully",
      success:true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const appliedJobs = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      })
      .sort({ createdAt: -1 });

    if (!appliedJobs) {
      return res
        .status(404)
        .json({ message: "No application found.", success: false });
    }
    return res.status(200).json({
      success: true,
      appliedJobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });
    if (!job) {
      return res.status(200).json({
        message: "Not any user applied for this job.",
        success: true,
      });
    }

    return res.status(200).json({
      success:true,
      job
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    if (!status) {
      return res.status(404).json({
        message: "Status not found",
        success: false,
      });
    }
    const application = await Application.findOne({_id:applicationId});
    if (!application) {
      return res.status(404).json({
        message: "appliaction not found",
        success: false,
      });
    }
    if (application) {
      application.status = status.toLowerCase()
      await application.save();
    }

    res.status(200).json({
      message: "Status changed successfully",
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
