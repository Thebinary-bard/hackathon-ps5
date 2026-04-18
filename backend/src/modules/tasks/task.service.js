import { Task } from "./task.model.js";
import { generateTaskPrompt, cleanJSON } from "../../config/ai.config.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
});

/**
 * 🧠 Generate AI Task using Gemini via LangChain
 */
const getAITask = async (skill) => {
    const prompt = generateTaskPrompt(skill);

    const result = await llm.invoke(prompt);
    const text = result.content;

    try {
        const parsed = JSON.parse(cleanJSON(text));
        return parsed;
    } catch (error) {
        console.error("AI Task Parsing Error:", text);
        throw new Error("Failed to parse AI task response");
    }
};

export const generateTask = async (skill) => {
    const aiData = await getAITask(skill);

    const task = await Task.create({
        ...aiData,
        skill,
        isAIGenerated: true,
    });

    return task;
};

export const getAllTasks = async () => {
    return await Task.find().sort({ createdAt: -1 });
};

export const getTaskById = async (taskId) => {
    const task = await Task.findById(taskId);
    if (!task) throw new Error("Task not found");

    return task;
};

export const createBusinessTask = async (data, userId) => {
    const task = await Task.create({
        ...data,
        createdBy: userId,
        isAIGenerated: false,
    });

    return task;
};