"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPosition(formData) {
  const title = formData.get("title");

  if (!title) return;

  await db.position.create({
    data: { title },
  });

  revalidatePath("/admin/positions");
}
