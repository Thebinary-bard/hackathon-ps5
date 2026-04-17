import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        requirements: [String],

        budget: {
            type: Number,
            default: 0,
        },

        skill: {
            type: String,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["open", "in-progress", "completed"],
            default: "open",
        },

        applicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Gig = mongoose.model("Gig", gigSchema);