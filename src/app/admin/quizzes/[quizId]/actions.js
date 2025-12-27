"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createGroup(formData) {
  const name = formData.get("name");
  const quizId = formData.get("quizId");

  if (!name || !quizId) {
    throw new Error("Missing name or quizId");
  }

  await db.group.create({
    data: {
      name,
      quizId,
    },
  });

  revalidatePath(`/admin/quizzes/${quizId}`);
}

export async function createTest(formData) {
  const quizId = formData.get("quizId");
  const durationMin = Number(formData.get("duration")) || 30;

  if (!quizId) return;

  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: {
      position: true,
      groups: {
        include: {
          questions: true,
        },
      },
    },
  });

  if (!quiz) return;

  const test = await db.test.create({
    data: {
      name: quiz.title,
      position: quiz.position.title,
      date: new Date(),
      durationMin,
    },
  });

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
