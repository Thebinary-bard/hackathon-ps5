import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: String,

        description: String,

        requirements: [String],

        skill: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null, // null = AI-generated
        },

        isAIGenerated: {
            type: Boolean,
            default: true,
        },

        // ⏳ optional but powerful
        deadline: Date,
    },
    { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);