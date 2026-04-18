import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
    evaluateSubmissionPrompt,
    cleanJSON,
} from "../../config/ai.config.js";

/**
 * 🧠 Initialize Gemini via LangChain
 */
const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

/**
 * 🧠 Evaluate submission using Gemini
 */
export const evaluateWithAI = async (task, submissionContent) => {
    try {
        const prompt = evaluateSubmissionPrompt(task, submissionContent);

        const result = await llm.invoke(prompt);
        const text = result.content;

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