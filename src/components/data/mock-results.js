import { mockQuizzes } from "./mock-quizzes";
import { mockSubmissions } from "./mock-submissions";
import { gradeMCQ } from "../lib/grading";

export const mockResults = mockSubmissions.map((submission) => {
  const quiz = mockQuizzes[0]; // single quiz for now

  let totalScore = 0;
  let maxScore = 0;

  const details = quiz.groups.flatMap((group) =>
    group.questions.map((q) => {
      maxScore += q.points;

      if (q.type === "mcq") {
        const result = gradeMCQ(q, submission.answers[q.id]);
        totalScore += result.score;

        return {
          question: q.question,
          type: "mcq",
          score: result.score,
          maxScore: q.points,
        };
      }

      // text question (manual)
      return {
        question: q.question,
        type: "text",
        answer: submission.answers[q.id],
        score: null,
        maxScore: q.points,
      };
    })
  );

  return {
    testId: submission.testId,
    candidate: "John Doe",
    totalScore,
    maxScore,
    details,
  };
});
