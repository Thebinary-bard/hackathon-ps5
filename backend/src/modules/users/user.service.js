import { User } from "./user.model.js";

export const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return user;
};

export const updateUserProfile = async (userId, data) => {
    const user = await User.findByIdAndUpdate(userId, data, {
        new: true,
    });

    return user;
};

export const addSkillToUser = async (userId, skillName) => {
    const user = await User.findById(userId);

    const existingSkill = user.skills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );

    if (!existingSkill) {
        user.skills.push({ name: skillName });
    }

    await user.save();
    return user;
};