import express from "express";
import {
    createSubmission,
    evaluate,
} from "./submission.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 👨‍🎓 submit work
router.post("/", protect, createSubmission);

// 🧠 evaluate (can be auto-triggered later)
router.post("/:id/evaluate", protect, evaluate);

export default router;