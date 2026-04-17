import {
    submitTask,
    evaluateSubmission,
} from "./submission.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const createSubmission = asyncHandler(async (req, res, next) => {
    const { taskId, content } = req.body;

    const submission = await submitTask(
        req.user.id,
        taskId,
        content
    );

    res.status(201).json({
        success: true,
        message: "Submission created",
        data: submission,
    });
});

export const evaluate = asyncHandler(async (req, res, next) => {
    const submission = await evaluateSubmission(req.params.id);

    res.json({
        success: true,
        message: "Submission evaluated",
        data: submission,
    });
});