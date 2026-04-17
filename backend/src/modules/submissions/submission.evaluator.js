import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";
import {
    evaluateSubmissionPrompt,
    cleanJSON,
} from "../../config/ai.config.js";

/**
 * 🧠 Initialize Gemini
 */
const genAI = new GoogleGenerativeAI(env.ai.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

/**
 * 🧠 Evaluate submission using Gemini
 */
export const evaluateWithAI = async (task, submissionContent) => {
    try {
        const prompt = evaluateSubmissionPrompt(task, submissionContent);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleaned = cleanJSON(text);

        const parsed = JSON.parse(cleaned);

        // 🛡️ Safety fallback (very important)
        return {
            score: parsed.score ?? 50,
            feedback: parsed.feedback ?? "No feedback provided",
            strengths: parsed.strengths ?? [],
            improvements: parsed.improvements ?? [],
        };
    } catch (error) {
        console.error("❌ AI Evaluation Error:", error.message);

        // 🔥 Fallback (so demo never breaks)
        return {
            score: 65,
            feedback: "Fallback evaluation used due to AI error.",
            strengths: ["Basic completion"],
            improvements: ["Could not fully evaluate"],
        };
    }
};