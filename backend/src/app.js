import express from "express";
import cors from "cors";

// Routes
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";
import submissionRoutes from "./modules/submissions/submission.routes.js";
import gigRoutes from "./modules/gigs/gig.routes.js";
import matchingRoutes from "./modules/matching/matching.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import aiRoutes from "./modules/ai/ai.routes.js";
import passport from "./config/passport.js";



const app = express();

app.use(passport.initialize());
/**
 * 🔧 Middlewares
 */
app.use(cors());
app.use(express.json());

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
 * 📦 API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiRoutes);
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