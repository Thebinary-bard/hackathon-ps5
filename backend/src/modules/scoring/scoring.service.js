import { User } from "../users/user.model.js";

/**
 * 🧠 Update user score after evaluation
 */
export const updateUserScore = async (userId, skill, newScore) => {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // 🔍 Find skill
    let skillObj = user.skills.find(
        (s) => s.name.toLowerCase() === skill.toLowerCase()
    );

    if (!skillObj) {
        // ➕ New skill
        user.skills.push({
            name: skill,
            score: newScore,
        });
    } else {
        // 📊 Weighted update (better than simple average)
        skillObj.score = Math.round(
            skillObj.score * 0.7 + newScore * 0.3
        );
    }

    // 📈 Task tracking
    user.completedTasks += 1;

    // 🧮 Overall score
    const total = user.skills.reduce((acc, s) => acc + s.score, 0);
    user.overallScore = Math.round(total / user.skills.length);

    // 📊 Reliability (improves gradually)
    user.reliability = Math.min(
        100,
        Math.round(user.reliability * 0.8 + 20)
    );

    await user.save();

    return user;
};