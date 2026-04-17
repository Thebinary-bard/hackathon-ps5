import express from "express";
import {
    create,
    getGigs,
    getGig,
    apply,
    updateStatus,
} from "./gig.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🏢 Create gig
router.post("/", protect, create);

// 📋 Get all gigs
router.get("/", protect, getGigs);

// 🔍 Get one gig
router.get("/:id", protect, getGig);

// 🙋 Apply
router.post("/:id/apply", protect, apply);

// 🔄 Update status
router.put("/:id/status", protect, updateStatus);

export default router;