import { User } from "./user.model.js";

export const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return user;
};

export const updateUserProfile = async (userId, data) => {
    // If skills sent as plain strings array (e.g. ["React","Node"]), normalize to skill objects
    if (Array.isArray(data.skills) && data.skills.length > 0 && typeof data.skills[0] === "string") {
        data.skills = data.skills.map((s) => ({ name: s }));
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true, runValidators: true }
    );

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