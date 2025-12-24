"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createQuestion(formData) {
  const groupId = formData.get("groupId");
  const text = formData.get("text");
  const type = formData.get("type");
  const score = Number(formData.get("score")) || 1;

  if (!groupId || !text || !type) return;

  const question = await db.question.create({
    data: {
      text,
      type,
      score,
      groupId,
    },
  });

  // MCQ: create options
  if (type === "MCQ") {
    const options = formData.getAll("options");
    const correctIndexes = formData.getAll("correct"); // ["0", "2"]

    for (let i = 0; i < options.length; i++) {
      if (!options[i]) continue;

      await db.choice.create({
        data: {
          text: options[i],
          isCorrect: correctIndexes.includes(String(i)),
          questionId: question.id,
        },
      });
    }
  }

  revalidatePath(`/admin/groups/${groupId}/questions`);
}
