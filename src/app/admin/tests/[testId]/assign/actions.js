"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function assignInterviewee(formData) {
  const testId = formData.get("testId");
  const userId = formData.get("userId");

  if (!userId || !testId) {
    return { error: "Missing test ID or user ID" };
  }

  // ✅ Check if user exists
  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return { error: "User not found" };
  }

  // ✅ Prevent duplicate assignment
  const alreadyAssigned = await db.assignedTest.findFirst({
    where: { testId, userId },
  });

  if (alreadyAssigned) {
    return { error: "This test is already assigned to this user" };
  }

  await db.assignedTest.create({
    data: {
      testId,
      userId,
    },
  });

  revalidatePath(`/admin/tests/${testId}`);
  return { success: true };
}
