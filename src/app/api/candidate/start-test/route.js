import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { assignedTestId } = await req.json();

  const assigned = await db.assignedTest.findUnique({
    where: { id: assignedTestId },
    include: { test: true },
  });

  if (!assigned) {
    return NextResponse.json({ error: "Invalid test" }, { status: 404 });
  }

  if (assigned.startedAt) {
    return NextResponse.json(assigned);
  }

  const now = new Date();
  const expiresAt = new Date(
    now.getTime() + assigned.test.durationMin * 60 * 1000
  );

  const updated = await db.assignedTest.update({
    where: { id: assignedTestId },
    data: {
      startedAt: now,
      expiresAt,
    },
  });

  return NextResponse.json(updated);
}
