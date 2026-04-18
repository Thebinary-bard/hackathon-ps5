import express from "express";
import cors from "cors";
import passport from "./config/passport.js";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import submissionRoutes from "./modules/submissions/submission.routes.js";
import gigRoutes from "./modules/gigs/gig.routes.js";
import matchingRoutes from "./modules/matching/matching.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";

import chatRoutes from "./modules/chat/chat.routes.js";

const app = express();

/**
 * 🔧 Middlewares
 */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(passport.initialize());

/**
 * 🩺 Health check
 */
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running 🚀",
    });
});

/**
 * 📦 API Routes (IMPORTANT: all prefixed with /api)
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chat", chatRoutes);

/**
 * ❌ 404 handler
 */
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

/**
 * ❌ Global Error Handler
 */
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export default app;