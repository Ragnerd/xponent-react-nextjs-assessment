import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { assignedTestId, answers } = await req.json();

  // mark test submitted
  await db.assignedTest.update({
    where: { id: assignedTestId },
    data: {
      submittedAt: new Date(),
      isLocked: true,
    },
  });

  // fetch questions with correct MCQs
  const questions = await db.question.findMany({
    where: { id: { in: Object.keys(answers) } },
    include: { choices: true },
  });

  // save answers
  for (const q of questions) {
    const userAnswer = answers[q.id];

    if (q.type === "TEXT") {
      await db.userAnswer.create({
        data: {
          assignedTestId,
          questionId: q.id,
          response: userAnswer,
          maxScore: q.score,
        },
      });
    }

    if (q.type === "MCQ") {
      const correctIds = q.choices
        .filter((c) => c.isCorrect)
        .map((c) => c.id)
        .sort();

      const givenIds = (userAnswer || []).sort();

      const isCorrect = JSON.stringify(correctIds) === JSON.stringify(givenIds);

      await db.userAnswer.create({
        data: {
          assignedTestId,
          questionId: q.id,
          mcqAnswerIds: givenIds.join(","),
          givenScore: isCorrect ? q.score : 0,
          maxScore: q.score,
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}
