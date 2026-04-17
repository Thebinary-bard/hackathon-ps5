import { getMatchedCandidates } from "./matching.service.js";
import { successResponse } from "../../utils/response.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

/**
 * 🤝 Get top matched candidates for a gig
 */
export const getMatches = asyncHandler(async (req, res, next) => {
    const matches = await getMatchedCandidates(req.params.gigId);

    // 🔥 Format response for frontend
    const formatted = matches.map((m) => ({
        userId: m.user._id,
        name: m.user.name,
        skills: m.user.skills,
        overallScore: m.user.overallScore,
        reliability: m.user.reliability,
        matchScore: m.matchScore,
    }));

    return successResponse(
        res,
        formatted,
        "Top candidates fetched"
    );
});