import express from "express";
import {
    addReview,
    getReviews,
} from "./review.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// ⭐ Add review
router.post("/", protect, addReview);

// 📊 Get reviews of a user
router.get("/:userId", protect, getReviews);

export default router;