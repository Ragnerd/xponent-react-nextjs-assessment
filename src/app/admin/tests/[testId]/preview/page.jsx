import { db } from "@/lib/db";
import TestClient from "@/app/candidate/[assignedTestId]/test-client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminTestPreviewPage({ params }) {
  const session = await auth();

  // Safety check
  if (session?.user?.email !== "admin@example.com") {
    redirect("/dashboard");
  }

  const assigned = await db.assignedTest.findUnique({
    where: { id: params.assignedTestId },
    include: {
      test: {
        include: {
          quiz: true,
          groups: {
            include: {
              group: {
                include: {
                  questions: {
                    include: { choices: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!assigned) {
    return <div className="p-6">Invalid test assignment</div>;
  }

  return <TestClient assigned={assigned} previewMode={true} />;
}
