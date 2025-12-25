"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function assignInterviewee(formData) {
  const testId = formData.get("testId");
  const userId = formData.get("userId");

  if (!testId || !userId) {
    throw new Error("Missing testId or userId");
  }

  const assigned = await db.assignedTest.create({
    data: {
      testId,
      userId, // must exist in User table
    },
  });

  redirect(`/candidate/${assigned.id}`);
}
