import { User } from "../users/user.model.js";
import { Gig } from "../gigs/gig.model.js";

/**
 * 🧠 Calculate match score
 */
const calculateMatchScore = (user, requiredSkill) => {
    const skill = user.skills.find(
        (s) => s.name.toLowerCase() === requiredSkill.toLowerCase()
    );

    if (!skill) return 0;

    const skillScore = skill.score || 0;
    const overallScore = user.overallScore || 0;
    const reliability = user.reliability || 0;

    // 🎯 Weighted scoring
    const matchScore =
        skillScore * 0.5 +
        overallScore * 0.3 +
        reliability * 0.2;

    return Math.round(matchScore);
};

/**
 * 🔍 Get best matched students for a gig
 */
export const getMatchedCandidates = async (gigId) => {
    const gig = await Gig.findById(gigId);

    if (!gig) throw new Error("Gig not found");

    const users = await User.find({ role: "student" });

    const ranked = users
        .map((user) => ({
            user,
            matchScore: calculateMatchScore(user, gig.skill),
        }))
        .filter((u) => u.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10); // top 10

    return ranked;
};