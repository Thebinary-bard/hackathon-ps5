import express from "express";
import { getMatches } from "./matching.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🤝 Get best candidates for a gig
router.get("/:gigId", protect, getMatches);

export default router;