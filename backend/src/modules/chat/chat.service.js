import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { buildPrompt } from "./promptTemplates.js";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY
});

export const sendMessageToAI = async ({ type, data }) => {
  try {
    const prompt = buildPrompt(type, data);

    const result = await llm.invoke(prompt);

    return {
      text: result.content
    };
  } catch (err) {
    console.error("AI ERROR:", err);
    throw new Error("AI failed");
  }
};
