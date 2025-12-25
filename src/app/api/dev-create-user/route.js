import { db } from "@/lib/db";

export async function GET() {
  const user = await db.user.upsert({
    where: { id: "demo-user" },
    update: {},
    create: {
      id: "demo-user",
      email: "demo@test.com",
      name: "Demo User",
    },
  });

  return Response.json(user);
}
