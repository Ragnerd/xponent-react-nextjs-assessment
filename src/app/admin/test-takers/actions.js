"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

function randomPassword() {
  return Math.random().toString(36).slice(-10);
}

export async function createTestTaker(formData) {
  const userId = formData.get("userId");
  const name = formData.get("name");
  const email = formData.get("email");
  let password = formData.get("password");

  if (!password) password = randomPassword();

  const hash = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      id: userId, // username = ID
      name,
      email,
      password: hash,
    },
  });

  return { userId, password };
}
