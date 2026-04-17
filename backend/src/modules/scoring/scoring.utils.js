/**
 * 🧮 Calculate overall score
 */
export const calculateOverallScore = (skills) => {
    if (!skills.length) return 0;

    const total = skills.reduce((acc, s) => acc + s.score, 0);
    return Math.round(total / skills.length);
};

/**
 * ⚖️ Weighted score calculation
 */
export const weightedScore = (oldScore, newScore) => {
    return Math.round(oldScore * 0.7 + newScore * 0.3);
};