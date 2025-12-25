"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTextQuestion(formData) {
  const groupId = formData.get("groupId");
  const text = formData.get("text");
  const score = Number(formData.get("score"));

  await db.question.create({
    data: {
      groupId,
      text,
      score,
      type: "TEXT",
    },
  });

  revalidatePath(`/admin/groups/${groupId}/questions`);
}

export async function createMcqQuestion(formData) {
  const groupId = formData.get("groupId");
  const text = formData.get("text");
  const score = Number(formData.get("score"));
  const correctIndexes = formData.getAll("correctIndexes").map(Number);

  const choices = [0, 1, 2, 3].map((i) => ({
    text: formData.get(`choice-${i}`),
    isCorrect: correctIndexes.includes(i),
  }));

  await db.question.create({
    data: {
      groupId,
      text,
      score,
      type: "MCQ",
      choices: {
        create: choices,
      },
    },
  });

  revalidatePath(`/admin/groups/${groupId}/questions`);
}
