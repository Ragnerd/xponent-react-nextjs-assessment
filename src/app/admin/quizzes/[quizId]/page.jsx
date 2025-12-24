import { db } from "@/lib/db";
import Link from "next/link";
import { createTest } from "./actions";

export default async function QuizPage({ params }) {
  const quiz = await db.quiz.findUnique({
    where: { id: params.quizId },
    include: { groups: true },
  });

  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">{quiz.title}</h1>

      {/* Create Group */}
      <form action={createTest} className="flex gap-2 max-w-md mt-6">
        <input type="hidden" name="quizId" value={quiz.id} />

        <input
          type="number"
          name="duration"
          placeholder="Duration (min)"
          className="border px-3 py-2 rounded w-full"
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create Test
        </button>
      </form>

      {/* List Groups */}
      <div className="space-y-3">
        {quiz.groups.map((group) => (
          <div key={group.id} className="border p-3 rounded">
            <div className="font-medium">{group.name}</div>

            <Link
              href={`/admin/groups/${group.id}/questions`}
              className="text-sm text-blue-600 underline"
            >
              Manage questions
            </Link>
          </div>
        ))}

        {quiz.groups.length === 0 && (
          <div className="text-sm text-gray-500">No groups added yet.</div>
        )}
      </div>
    </div>
  );
}
