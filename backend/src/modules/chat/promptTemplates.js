const SYSTEM_PROMPT = `You are "AI Copilot", a helpful assistant strictly for a student dashboard.
Your ONLY purpose is to help students with resumes, portfolios, tasks, and job descriptions.
If the user asks about ANYTHING unrelated to computer science, tech careers, resume building, job descriptions, tasks, or portfolios, you MUST politely decline to answer.

User Request: `;

export const buildPrompt = (type, data) => {
  switch (type) {
    case "resume":
      return `${SYSTEM_PROMPT}
Convert this into a professional resume bullet:
Project: ${data.project}
Tech: ${data.tech}
Keep it short and simple.`;

    case "jd-summary":
      return `${SYSTEM_PROMPT}
Extract key points:
${data.text}

Return:
- skills
- responsibilities
- level`;

    default:
      return `${SYSTEM_PROMPT}\n${data.text}`;
  }
};
