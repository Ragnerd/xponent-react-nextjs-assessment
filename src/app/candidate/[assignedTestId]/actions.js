"use server";

import { db } from "@/lib/db";

export async function submitTest({ assignedTestId, answers, auto }) {
  const assigned = await db.assignedTest.findUnique({
    where: { id: assignedTestId },
  });

  if (!assigned || assigned.submittedAt) return;

  const session = await db.userTestSession.create({
    data: {
      assignedTestId,
      submittedAt: new Date(),
      autoSubmitted: auto,
    },
  });

  for (const [questionId, value] of Object.entries(answers)) {
    await db.userAnswer.create({
      data: {
        questionId,
        value: Array.isArray(value) ? JSON.stringify(value) : value,
        sessionId: session.id,
      },
    });
  }

  // 🔒 lock test properly
  await db.assignedTest.update({
    where: { id: assignedTestId },
    data: {
      submittedAt: new Date(),
    },
  });
}
