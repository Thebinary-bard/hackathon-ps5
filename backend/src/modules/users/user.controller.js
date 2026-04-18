import {
    getUserProfile,
    updateUserProfile,
    addSkillToUser,
    addPortfolioItemToUser,
} from "./user.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const getProfile = asyncHandler(async (req, res, next) => {
    const user = await getUserProfile(req.user.id);

    res.json({
        success: true,
        data: user,
    });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
    const user = await updateUserProfile(req.user.id, req.body);

    res.json({
        success: true,
        message: "Profile updated",
        data: user,
    });
});

export const addSkill = asyncHandler(async (req, res, next) => {
    const { skill } = req.body;

    const user = await addSkillToUser(req.user.id, skill);

    res.json({
        success: true,
        message: "Skill added",
        data: user,
    });
});

export const addPortfolio = asyncHandler(async (req, res, next) => {
    const user = await addPortfolioItemToUser(req.user.id, req.body);

    res.json({
        success: true,
        message: "Portfolio item added",
        data: user,
    });
});