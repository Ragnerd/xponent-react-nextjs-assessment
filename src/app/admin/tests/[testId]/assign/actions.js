"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function assignInterviewee(formData) {
  try {
    const testId = formData.get("testId");
    const userId = formData.get("userId");

    if (!userId || !testId) {
      return { error: "Missing test ID or user ID" };
    }

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Prevent duplicate assignment
    const alreadyAssigned = await db.assignedTest.findFirst({
      where: { testId, userId },
    });

    if (alreadyAssigned) {
      return { error: "This test is already assigned to this user" };
    }

    // Create assignment
    const assigned = await db.assignedTest.create({
      data: {
        testId,
        userId,
      },
    });

    // Revalidate admin test page
    revalidatePath(`/admin/tests/${testId}`);

    // Return assigned test ID for preview
    return {
      success: true,
      assignedTestId: assigned.id,
    };
  } catch (error) {
    console.error("Assign test error:", error);
    return { error: "Failed to assign test" };
  }
}
