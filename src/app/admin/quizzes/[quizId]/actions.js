"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createTest(formData) {
  const quizId = formData.get("quizId");
  const durationMin = Number(formData.get("duration")) || 30;

  if (!quizId) return;

  // Get quiz with all questions
  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: {
      groups: {
        include: {
          questions: true,
        },
      },
    },
  });

  if (!quiz) return;

  // Create test
  const test = await db.test.create({
    data: {
      name: quiz.title,
      position: quiz.position.title,
      date: new Date(),
      durationMin,
    },
  });

  // Flatten questions & attach to test
  let order = 1;

  for (const group of quiz.groups) {
    for (const question of group.questions) {
      await db.testQuestion.create({
        data: {
          testId: test.id,
          questionId: question.id,
          order: order++,
        },
      });
    }
  }

  redirect(`/admin/tests/${test.id}`);
}
