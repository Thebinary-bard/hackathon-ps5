import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },

        content: {
            type: String, // link / text / github / drive
            required: true,
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
    },
    { timestamps: true }
);

export const Submission = mongoose.model(
    "Submission",
    submissionSchema
);