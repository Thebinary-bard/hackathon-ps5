import {
    createReview,
    getUserReviews,
} from "./review.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addReview = asyncHandler(async (req, res, next) => {
    const review = await createReview(req.body, req.user.id);

    res.status(201).json({
        success: true,
        message: "Review added",
        data: review,
    });
});

export const getReviews = asyncHandler(async (req, res, next) => {
    const reviews = await getUserReviews(req.params.userId);

    res.json({
        success: true,
        data: reviews,
    });
});