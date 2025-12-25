"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createTest(formData) {
  const quizId = formData.get("quizId");
  const name = formData.get("name");
  const date = new Date(formData.get("testDate"));
  const durationMin = Number(formData.get("durationMin"));

  // ✅ THIS WAS MISSING
  const groupIds = formData.getAll("groupIds");

  const test = await db.test.create({
    data: {
      name,
      quizId,
      date,
      durationMin,
      groups: {
        create: groupIds.map((gid) => ({
          groupId: gid,
        })),
      },
    },
  });

  redirect(`/admin/tests/${test.id}`);
}
