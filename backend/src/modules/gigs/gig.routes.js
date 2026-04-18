import express from "express";
import {
    create,
    getGigs,
    getMyGigs,
    getGig,
    apply,
    updateGig,
    updateStatus,
    deleteGig,
} from "./gig.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

// 📋 Get all gigs (any authenticated user)
router.get("/", protect, getGigs);

// 📋 Get gigs created by current business user
router.get("/my", protect, authorize("business"), getMyGigs);

// 🔍 Get one gig
router.get("/:id", protect, getGig);

// ✅ Create gig — business only
router.post("/", protect, authorize("business"), create);

// ✏️ Update gig — business only
router.put("/:id", protect, authorize("business"), updateGig);

// 🔄 Update status — business only
router.put("/:id/status", protect, authorize("business"), updateStatus);

// ❌ Delete gig — business only
router.delete("/:id", protect, authorize("business"), deleteGig);

// 🙋 Apply to gig — student only
router.post("/:id/apply", protect, authorize("student"), apply);

export default router;