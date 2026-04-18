import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const sendMessageToAI = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(prompt);

        return result.response.text();
    } catch (error) {
        console.error("AI ERROR:", error);
        throw new Error("Failed to get response from AI");
    }
};
