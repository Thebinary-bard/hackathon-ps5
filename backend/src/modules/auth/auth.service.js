import bcrypt from "bcrypt"; // ✅ use only ONE (bcrypt)
import jwt from "jsonwebtoken";
import { User } from "../users/user.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/jwt.js";

// 🔥 Generate JWT Token
export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

// 🔥 Register User
export const registerUser = async ({ name, email, password, role }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    user.password = undefined;
    const token = generateToken(user);

    return { user, token };
};

// 🔥 Login User
export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return { user, token };
};