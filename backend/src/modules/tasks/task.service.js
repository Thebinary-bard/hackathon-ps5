import { Task } from "./task.model.js";
import { generateTaskPrompt, cleanJSON } from "../../config/ai.config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";

// Lazy-init: create model on first use so a missing API key doesn't crash startup
let _model = null;
const getModel = () => {
    if (!_model) {
        const genAI = new GoogleGenerativeAI(env.ai.apiKey);
        _model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    }
    return _model;
};

/**
 * 🧠 Generate AI Task using Gemini
 */
const getAITask = async (skill) => {
    const prompt = generateTaskPrompt(skill);

    try {
        const result = await getModel().generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        try {
            const parsed = JSON.parse(cleanJSON(text));
            return parsed;
        } catch (error) {
            console.error("AI Task Parsing Error:", text);
            throw new Error("Failed to parse AI task response");
        }
    } catch (apiError) {
        console.error("⚠️ Gemini API Error. Falling back to mock data:", apiError.message);
        
        // ✨ Fallback so the hackathon app doesn't crash if the API Key is invalid
        return {
            title: `Build a ${skill} application`,
            description: `We need a simple ${skill} interface for our upcoming product launch.`,
            requirements: ["Responsive design", "Clean code", "Use modern practices"],
            difficulty: "medium"
        };
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