import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/authenticatedUser.middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update-profile", isAuthenticated, updateProfile);

export default router;
