import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
    const user = await registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
    });
});

export const login = asyncHandler(async (req, res, next) => {
    const { user, token } = await loginUser(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        data: user,
    });
});