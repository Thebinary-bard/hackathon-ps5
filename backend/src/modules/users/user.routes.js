import express from "express";
import {
    getProfile,
    updateProfile,
    addSkill,
} from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Profile
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

// Alias: PUT /api/users/profile (used in Postman docs)
router.put("/profile", protect, updateProfile);

// Skills
router.post("/skills", protect, addSkill);

export default router;