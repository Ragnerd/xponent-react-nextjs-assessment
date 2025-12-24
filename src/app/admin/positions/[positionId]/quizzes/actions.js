"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createQuiz(formData) {
  const title = formData.get("title");
  const positionId = formData.get("positionId");

  if (!title || !positionId) return;

  await db.quiz.create({
    data: {
      title,
      positionId,
    },
  });

  revalidatePath(`/admin/positions/${positionId}/quizzes`);
}
