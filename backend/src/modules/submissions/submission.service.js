import { Submission } from "./submission.model.js";
import { evaluateWithAI } from "./submission.evaluator.js";
import { updateUserScore } from "../scoring/scoring.service.js";

/**
 * 📤 Create submission
 */
export const submitTask = async (userId, taskId, content) => {
    const submission = await Submission.create({
        user: userId,
        task: taskId,
        content,
    });

    return submission;
};

/**
 * 🧠 Evaluate submission (AI + scoring)
 */
export const evaluateSubmission = async (submissionId) => {
    const submission = await Submission.findById(submissionId)
        .populate("task")
        .populate("user");

    if (!submission) {
        throw new Error("Submission not found");
    }

    // 🔥 AI Evaluation (cleanly separated)
    const aiResult = await evaluateWithAI(
        submission.task,
        submission.content
    );

    // 🧾 Save AI results
    submission.score = aiResult.score;
    submission.feedback = aiResult.feedback;
    submission.strengths = aiResult.strengths;
    submission.improvements = aiResult.improvements;
    submission.status = "evaluated";

    await submission.save();

    // 🧠 Update user scoring (moved to scoring module)
    await updateUserScore(
        submission.user._id,
        submission.task.skill,
        aiResult.score
    );

    return submission;
};