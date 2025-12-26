import { db } from "@/lib/db";
import Link from "next/link";
import { createGroup } from "./actions";

export default async function QuizPage({ params }) {
  const quiz = await db.quiz.findUnique({
    where: { id: params.quizId },
    include: {
      groups: {
        include: {
          questions: { select: { id: true } },
        },
      },
    },
  });

  if (!quiz) return <div className="p-6">Quiz not found</div>;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">{quiz.title}</h1>
        <p className="text-sm text-gray-500">
          Organize questions into groups for this quiz
        </p>
      </div>

      {/* Create Group */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <form action={createGroup} className="flex gap-3 items-center">
          <input type="hidden" name="quizId" value={quiz.id} />

          <input
            name="name"
            placeholder="e.g. Logic, React, JavaScript"
            className="border px-3 py-2 rounded w-full"
            required
          />

          <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800">
            Add Group
          </button>
        </form>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        {quiz.groups.length === 0 && (
          <div className="border rounded-lg p-6 text-center text-gray-500">
            No groups yet. Add your first group to start creating questions.
          </div>
        )}

        {quiz.groups.map((group) => (
          <div
            key={group.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-lg">{group.name}</div>
              <div className="text-sm text-gray-500">
                {group.questions.length} question
                {group.questions.length !== 1 && "s"}
              </div>
            </div>

            <Link
              href={`/admin/groups/${group.id}/questions`}
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Manage Questions
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
