import { User } from "../users/user.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";

const genAI = new GoogleGenerativeAI(env.ai.apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const handleAIRequest = async (userId, input) => {
    // 1️⃣ Fetch user data
    const user = await User.findById(userId);

    // 2️⃣ Build smart prompt
    const prompt = `
User Skills: ${JSON.stringify(user.skills)}
Overall Score: ${user.overallScore}

User Query: ${input}

Return structured JSON:
{
  "insights": "string",
  "recommendations": ["string"],
  "nextSteps": ["string"]
}
`;

    try {
        // 3️⃣ Call AI
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        return JSON.parse(text);
    } catch (apiError) {
        console.error("⚠️ Gemini API Error in AI Service. Falling back to mock data:", apiError.message);
        
        return {
            insights: "Your skills look solid, but you could use more practical projects.",
            recommendations: ["Learn Docker", "Build a full-stack clone"],
            nextSteps: ["Apply for 2 gigs", "Update your resume"]
        };
    }
};