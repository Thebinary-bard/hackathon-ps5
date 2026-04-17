import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { askAI } from "./ai.controller.js";

const router = express.Router();

router.post("/", protect, askAI);

export default router;