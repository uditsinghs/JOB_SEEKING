import express from "express";

import { isAuthenticated } from "../middleware/authenticatedUser.middleware.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
const router = express.Router();
router.post("/apply/:id", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/get/:id", isAuthenticated, getApplicants);
router.put("/update/:id", isAuthenticated, updateApplicationStatus);
export default router;
