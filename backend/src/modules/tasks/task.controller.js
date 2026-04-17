import {
    generateTask,
    getAllTasks,
    getTaskById,
    createBusinessTask,
} from "./task.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const generateAITask = asyncHandler(async (req, res, next) => {
    const { skill } = req.body;

    const task = await generateTask(skill);

    res.json({
        success: true,
        message: "AI task generated",
        data: task,
    });
});

export const getTasks = asyncHandler(async (req, res, next) => {
    const tasks = await getAllTasks();

    res.json({
        success: true,
        data: tasks,
    });
});

export const getTask = asyncHandler(async (req, res, next) => {
    const task = await getTaskById(req.params.id);

    res.json({
        success: true,
        data: task,
    });
});

export const createTask = asyncHandler(async (req, res, next) => {
    const task = await createBusinessTask(req.body, req.user.id);

    res.status(201).json({
        success: true,
        message: "Task created",
        data: task,
    });
});