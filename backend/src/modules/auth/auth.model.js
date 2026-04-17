import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // 🔥 don't return password by default
        },
        role: {
            type: String,
            enum: ["student", "business", "admin"],
            default: "student",
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);