import { sendMessageToAI } from "./chat.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const handleChat = asyncHandler(async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return errorResponse(res, "Message is required", 400);
    }

    const reply = await sendMessageToAI(message);

    return successResponse(res, { reply }, "Chat response generated successfully", 200);
});
