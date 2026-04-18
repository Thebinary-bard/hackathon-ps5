/**
 * 📊 Behavior Score Calculation
 */
export const calculateBehaviorScore = (submission) => {
  let score = 50;
  const insights = [];

  const startDelay =
    submission.firstActionAt - submission.startedAt;

  if (startDelay < 60000) {
    score += 15;
    insights.push("Quick to start and decisive");
  }

  if (submission.editsCount > 2) {
    score += 15;
    insights.push("Iterative and improves work");
  }

  if (submission.messages.length > 2) {
    score += 10;
    insights.push("Engages actively");
  }

  return {
    behaviorScore: Math.min(score, 100),
    insights
  };
};

/**
 * 🔒 Trust Score Calculation
 */
export const calculateTrustScore = (submission) => {
  const totalTime =
    submission.submittedAt - submission.startedAt;

  const execution = Math.max(50, 100 - totalTime / 10000);
  const communication =
    submission.messages.length > 2 ? 80 : 60;
  const adaptability =
    submission.editsCount > 2 ? 85 : 60;
  const reliability =
    totalTime < 600000 ? 85 : 65;

  const trustScore = Math.round(
    (execution + communication + adaptability + reliability) / 4
  );

  let insight = "";

  if (execution > 80 && adaptability > 80) {
    insight = "Strong executor, adapts well";
  } else if (communication < 70) {
    insight = "Strong executor, slightly slow in communication";
  } else {
    insight = "Consistent performer";
  }

  return {
    trustScore,
    breakdown: {
      execution,
      communication,
      adaptability,
      reliability
    },
    insight
  };
};
