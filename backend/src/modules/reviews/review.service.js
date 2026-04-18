import { Review } from "./review.model.js";
import { User } from "../users/user.model.js";

/**
 * ⭐ Create review
 * Accepts both { toUser, rating, comment, gig? }  (Postman-style)
 * and           { reviewee, rating, comment, gig? } (internal style)
 */
export const createReview = async (data, reviewerId) => {
    // Normalize: toUser alias → reviewee
    const revieweeId = data.toUser || data.reviewee;
    if (!revieweeId) throw new Error("toUser (reviewee) is required");

    const review = await Review.create({
        rating: data.rating,
        comment: data.comment || "",
        gig: data.gig || null,
        reviewee: revieweeId,
        reviewer: reviewerId,
    });

    // 🔥 Update user's reliability based on rating
    await updateUserRating(revieweeId, review.rating);

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