import { env } from "./env.js";

/**
 * 🧠 Prompt for generating real-world tasks
 */
export const generateTaskPrompt = (skill) => {
    return `
You are a real-world job simulator.

Create a practical freelance task for a student skilled in "${skill}".

Make it:
- Realistic (like a client request)
- Slightly vague (like real clients)
- Include deliverables
- Include constraints

Return ONLY valid JSON:

{
  "title": "string",
  "description": "string",
  "requirements": ["string"],
  "difficulty": "easy | medium | hard"
}
`;
};

/**
 * 🧠 Prompt for evaluating submissions
 */
export const evaluateSubmissionPrompt = (task, submission) => {
    return `
You are an expert evaluator.

TASK:
${JSON.stringify(task)}

SUBMISSION:
${submission}

Evaluate based on:
- Quality
- Clarity
- Problem solving
- Communication

Return ONLY valid JSON:

{
  "score": number (0-100),
  "feedback": "string",
  "strengths": ["string"],
  "improvements": ["string"]
}
`;
};

/**
 * 🧼 Clean Gemini output
 */
export const cleanJSON = (text) => {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};