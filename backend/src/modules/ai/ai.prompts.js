/**
 * 🧠 Base system instruction
 * Ensures consistent AI behavior
 */
export const baseSystemPrompt = `
You are an intelligent career assistant for students from Tier-2 and Tier-3 colleges.

Your goals:
- Evaluate skills fairly
- Remove bias (ignore college names, background)
- Focus only on skills, work, and performance

Rules:
- ALWAYS return valid JSON
- NO extra text outside JSON
- NO markdown
`;

/**
 * 🔥 Recommendation Prompt
 */
export const recommendationPrompt = (user, query) => {
    return `
${baseSystemPrompt}

USER DATA:
Skills: ${JSON.stringify(user.skills)}
Overall Score: ${user.overallScore}
Reliability: ${user.reliability}

USER QUERY:
"${query}"

TASK:
- Understand user intent
- Suggest relevant gigs or work
- Identify missing skills

Return ONLY JSON:

{
  "insights": "string",
  "recommendedSkills": ["string"],
  "suggestedTasks": ["string"],
  "careerAdvice": ["string"]
}
`;
};

/**
 * 🔥 Skill Gap Analyzer Prompt
 */
export const skillGapPrompt = (user, targetRole) => {
    return `
${baseSystemPrompt}

USER DATA:
Skills: ${JSON.stringify(user.skills)}
Overall Score: ${user.overallScore}

TARGET ROLE:
"${targetRole}"

TASK:
- Compare user skills with role requirements
- Identify missing skills
- Suggest improvements

Return ONLY JSON:

{
  "currentStrengths": ["string"],
  "missingSkills": ["string"],
  "learningPlan": ["string"],
  "estimatedReadiness": number
}
`;
};

/**
 * 🔥 Portfolio Generator Prompt
 */
export const portfolioPrompt = (user, submissions) => {
    return `
${baseSystemPrompt}

USER DATA:
Name: ${user.name}
Skills: ${JSON.stringify(user.skills)}

SUBMISSIONS:
${JSON.stringify(submissions)}

TASK:
- Create a professional portfolio
- Highlight real work and outcomes

Return ONLY JSON:

{
  "headline": "string",
  "summary": "string",
  "projects": [
    {
      "title": "string",
      "description": "string"
    }
  ],
  "strengths": ["string"]
}
`;
};

/**
 * 🔥 Gig Analysis Prompt
 */
export const gigAnalysisPrompt = (gig) => {
    return `
${baseSystemPrompt}

GIG DETAILS:
${JSON.stringify(gig)}

TASK:
- Extract required skills
- Determine difficulty level

Return ONLY JSON:

{
  "skillsRequired": ["string"],
  "difficulty": "easy | medium | hard",
  "category": "string"
}
`;
};

/**
 * 🧠 Intent Detection Prompt (VERY IMPORTANT)
 */
export const intentDetectionPrompt = (query) => {
    return `
${baseSystemPrompt}

USER QUERY:
"${query}"

TASK:
Classify the user's intent.

Return ONLY JSON:

{
  "intent": "recommendation | skill_gap | portfolio | general"
}
`;
};

/**
 * 🧼 Safe JSON Parser (CRITICAL)
 */
export const safeParse = (text) => {
    try {
        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleaned);
    } catch (error) {
        console.error("❌ AI JSON Parse Error:", text);

        return {
            error: "Invalid AI response",
        };
    }
};