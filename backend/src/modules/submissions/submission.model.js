import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        taskId: {
            type: String, // String to handle custom IDs like PRC-101
            required: true,
        },

        content: {
            type: String, // link / text / github / drive
            default: "",
        },

        // 🧠 AI Evaluation Output
        score: {
            type: Number,
            default: 0,
        },

        feedback: String,

        strengths: [String],
        improvements: [String],

        status: {
            type: String,
            enum: ["pending", "evaluated"],
            default: "pending",
        },

        // 📊 Behavior Tracking
        startedAt: Date,
        firstActionAt: Date,
        submittedAt: Date,
        editsCount: {
            type: Number,
            default: 0,
        },
        messages: [
            {
                from: { type: String, enum: ["ai", "user"] },
                time: { type: Date, default: Date.now }
            }
        ],
    },
    { timestamps: true }
);

export const Submission = mongoose.model(
    "Submission",
    submissionSchema
);