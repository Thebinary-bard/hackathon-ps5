import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: String,
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
    },
    score: {
        type: Number,
        default: 0,
    },
});

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        role: {
            type: String,
            enum: ["student", "business", "admin"],
            default: "student",
        },

        // 🎓 Remove college bias later in UI (important for hackathon story)
        college: {
            type: String,
            default: "",
        },

        // 🧠 Core idea
        skills: [skillSchema],

        // 📊 Trust system
        overallScore: {
            type: Number,
            default: 0,
        },

        completedTasks: {
            type: Number,
            default: 0,
        },

        reliability: {
            type: Number,
            default: 0, // based on submissions consistency
        },

        // 💼 Portfolio
        portfolio: [
            {
                title: String,
                description: String,
                link: String,
            },
        ],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);