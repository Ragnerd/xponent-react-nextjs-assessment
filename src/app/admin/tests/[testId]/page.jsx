import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminTestPage({ params }) {
  const test = await db.test.findUnique({
    where: { id: params.testId },
    include: {
      groups: {
        include: {
          group: {
            include: {
              questions: {
                include: {
                  choices: true,
                },
              },
            },
          },
        },
      },
      quiz: true,
    },
  });

  if (!test) {
    return <div className="p-6">Test not found</div>;
  }

  // flatten questions
  const questions = test.groups.flatMap((tg) => tg.group.questions);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">{test.name}</h1>

      <div className="text-sm text-gray-600">
        Quiz: {test.quiz.title} <br />
        Duration: {test.durationMin} minutes
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Questions included</h2>

        {questions.length === 0 && (
          <p className="text-gray-500">No questions assigned.</p>
        )}

        {questions.map((q, idx) => (
          <div key={q.id} className="border p-4 rounded space-y-2">
            <div className="font-medium">
              {idx + 1}. {q.text}
            </div>

            {/* TEXT ANSWER */}
            {q.type === "TEXT" && (
              <textarea
                disabled
                placeholder="Candidate will type answer here..."
                className="w-full border rounded p-2 text-sm"
                rows={3}
              />
            )}

            {/* MCQ */}
            {q.type === "MCQ" && (
              <div className="space-y-1">
                {q.choices.map((c) => (
                  <label key={c.id} className="flex gap-2 text-sm">
                    <input type="checkbox" disabled />
                    {c.text}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-6">
        <Link
          href={`/admin/tests/${test.id}/assign`}
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Assign Interviewee
        </Link>
      </div>
    </div>
  );
}
