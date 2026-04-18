const STUDENT_SYSTEM_PROMPT = `You are "AI Copilot", a helpful assistant for a student dashboard.
Your ONLY purpose is to help students with resumes, portfolios, tasks, and job descriptions.
Include helpful, brief responses.`;

const COMPANY_SYSTEM_PROMPT = `You are "AI Recruitment Assistant", a helpful assistant for a company portal.
Your purpose is to help companies manage job postings, review student submissions, and match talent.
HIRING ACTION: If a company representative clearly decides to hire a student after some discussion (e.g., "I want to hire Rahul Kumar"), you MUST acknowledge it and append [ACTION:HIRE] at the very end of your message.`;

export const buildPrompt = (type, data) => {
  // If the message contains [Screen Context], it's a generic chat message from either portal
  if (type === "chat") {
    const isCompany = data.text.includes("Company:");
    const systemPrompt = isCompany ? COMPANY_SYSTEM_PROMPT : STUDENT_SYSTEM_PROMPT;
    return `${systemPrompt}\n\n${data.text}`;
  }

  // Specific template types
  switch (type) {
    case "resume":
      return `${STUDENT_SYSTEM_PROMPT}
Convert this into a professional resume bullet:
Project: ${data.project}
Tech: ${data.tech}
Keep it short and simple.`;

    case "jd-summary":
      return `${STUDENT_SYSTEM_PROMPT}
Extract key points from this Job Description:
${data.text}

Return:
- skills
- responsibilities
- level`;

    default:
      return `Helpful AI Assistant strictly for student/company portals.\n${data.text}`;
  }
};

