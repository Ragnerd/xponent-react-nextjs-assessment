import { db } from "@/lib/db";
import TestClient from "./test-client";

export default async function CandidateTestPage({ params }) {
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
    return <div className="p-6">Invalid or expired test</div>;
  }

  return <TestClient assigned={assigned} />;
}
