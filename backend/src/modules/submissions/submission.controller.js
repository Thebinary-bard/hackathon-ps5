import { Submission } from "./submission.model.js";
import { calculateBehaviorScore, calculateTrustScore } from "./scoring.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { successResponse, errorResponse } from "../../utils/response.js";

// 1️⃣ START TASK
export const startTask = asyncHandler(async (req, res) => {
    const { taskId } = req.body;
    const submission = await Submission.create({
        user: req.user.id,
        task: taskId,
        startedAt: new Date()
    });
    return successResponse(res, submission, "Task started");
});

// 2️⃣ FIRST ACTION
export const trackAction = asyncHandler(async (req, res) => {
    const { submissionId } = req.body;
    const submission = await Submission.findById(submissionId);
    if (!submission.firstActionAt) {
        submission.firstActionAt = new Date();
        await submission.save();
    }
    return successResponse(res, submission, "Action tracked");
});

// 3️⃣ TRACK EDIT
export const trackEdit = asyncHandler(async (req, res) => {
    const { submissionId } = req.body;
    const submission = await Submission.findByIdAndUpdate(
        submissionId,
        { $inc: { editsCount: 1 } },
        { new: true }
    );
    return successResponse(res, submission, "Edit tracked");
});

// 4️⃣ TRACK MESSAGE
export const trackMessage = asyncHandler(async (req, res) => {
    const { submissionId, from } = req.body;
    const submission = await Submission.findById(submissionId);
    submission.messages.push({ from, time: new Date() });
    await submission.save();
    return successResponse(res, submission, "Message tracked");
});

// 5️⃣ SUBMIT TASK
export const submitTask = asyncHandler(async (req, res) => {
    const { submissionId, content } = req.body;
    const submission = await Submission.findById(submissionId);
    
    submission.content = content;
    submission.submittedAt = new Date();
    submission.status = "evaluated";
    
    const behaviorData = calculateBehaviorScore(submission);
    const trustData = calculateTrustScore(submission);
    
    await submission.save();

    return successResponse(res, {
        behaviorScore: behaviorData.behaviorScore,
        insights: behaviorData.insights,
        trustScore: {
            trustScore: trustData.trustScore,
            breakdown: trustData.breakdown,
            insight: trustData.insight
        }
    }, "Task evaluated successfully");
});

// 6️⃣ GET ALL SUBMISSIONS (for Company)
export const getSubmissions = asyncHandler(async (req, res) => {
    // If company, get tasks they created, then find those submissions
    // For now, let's keep it simple: get all for the demo, or filter by user type
    const query = req.user.role === 'company' ? {} : { user: req.user.id };
    
    const submissions = await Submission.find(query)
        .populate("user", "name email");
        
    return successResponse(res, submissions, "Submissions retrieved");
});