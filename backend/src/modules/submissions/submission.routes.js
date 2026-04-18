import express from "express";
import {
    startTask,
    trackAction,
    trackEdit,
    trackMessage,
    submitTask,
    getSubmissions,
} from "./submission.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/start", protect, startTask);
router.post("/action", protect, trackAction);
router.post("/edit", protect, trackEdit);
router.post("/message", protect, trackMessage);
router.post("/submit", protect, submitTask);
router.get("/", protect, getSubmissions);

export default router;