import { db } from "@/lib/db";
import Link from "next/link";
import { createQuiz } from "./actions";

export default async function PositionQuizzesPage({ params }) {
  const position = await db.position.findUnique({
    where: { id: params.positionId },
    include: { quizzes: true },
  });

  if (!position) return <div>Position not found</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Quizzes for {position.title}
      </h1>

      <form action={createQuiz} className="flex gap-2 max-w-md">
        <input type="hidden" name="positionId" value={position.id} />
        <input
          name="title"
          placeholder="e.g. Frontend Screening Quiz"
          className="border px-3 py-2 rounded w-full"
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>

      <div className="space-y-3">
        {position.quizzes.map((q) => (
          <div key={q.id} className="border p-3 rounded">
            <div className="font-medium">{q.title}</div>
            <Link
              href={`/admin/quizzes/${q.id}`}
              className="text-sm text-blue-600 underline"
            >
              Manage quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
