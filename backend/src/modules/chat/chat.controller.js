import { sendMessageToAI } from "./chat.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const handleChat = asyncHandler(async (req, res) => {
    const { type, data, message } = req.body;
    
    const payloadData = data || { text: message };

    if (!payloadData || !payloadData.text && type === undefined) {
        return errorResponse(res, "Data payload or message is required", 400);
    }

    const replyObj = await sendMessageToAI({ type, data: payloadData });

    return successResponse(res, { reply: replyObj.text }, "Chat response generated successfully", 200);
});
