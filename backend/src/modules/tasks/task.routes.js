import express from "express";
import {
    generateAITask,
    getTasks,
    getTask,
    createTask,
} from "./task.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🎓 Student → generate task
router.post("/generate", protect, generateAITask);

// 📋 Get all tasks
router.get("/", protect, getTasks);

// 🔍 Get single task
router.get("/:id", protect, getTask);

// 🏢 Business → create real task
router.post("/", protect, createTask);

export default router;