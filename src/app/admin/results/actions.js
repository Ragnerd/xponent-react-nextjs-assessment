"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function scoreTextAnswer(formData) {
  const answerId = formData.get("answerId");
  const score = Number(formData.get("score"));

  await db.userAnswer.update({
    where: { id: answerId },
    data: { givenScore: score },
  });

  revalidatePath("/admin/results");
}
