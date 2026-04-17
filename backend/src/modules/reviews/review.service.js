import { Review } from "./review.model.js";
import { User } from "../users/user.model.js";

/**
 * ⭐ Create review
 */
export const createReview = async (data, reviewerId) => {
    const review = await Review.create({
        ...data,
        reviewer: reviewerId,
    });

    // 🔥 Update user's reliability based on rating
    await updateUserRating(review.reviewee, review.rating);

    return review;
};

/**
 * 📊 Get reviews for a user
 */
export const getUserReviews = async (userId) => {
    return await Review.find({ reviewee: userId })
        .populate("reviewer", "name")
        .sort({ createdAt: -1 });
};

/**
 * 🧠 Update reliability score
 */
const updateUserRating = async (userId, rating) => {
    const user = await User.findById(userId);

    if (!user) return;

    // simple logic: convert 1–5 → 20–100
    const score = rating * 20;

    user.reliability = Math.round((user.reliability + score) / 2);

    await user.save();
};