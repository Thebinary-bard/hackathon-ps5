import express from "express";
import {
    getProfile,
    updateProfile,
    addSkill,
    addPortfolio,
} from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.post("/skills", protect, addSkill);
router.post("/portfolio", protect, addPortfolio);

export default router;