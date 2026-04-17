import { handleAIRequest } from "./ai.service.js";

export const askAI = async (req, res, next) => {
    try {
        const result = await handleAIRequest(
            req.user.id,
            req.body.query
        );

        res.json({
            success: true,
            data: result,
        });
    } catch (err) {
        next(err);
    }
};