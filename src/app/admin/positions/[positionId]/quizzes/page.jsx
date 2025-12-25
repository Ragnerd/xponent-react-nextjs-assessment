import { db } from "@/lib/db";
import Link from "next/link";
import { createQuiz } from "./actions";

export default async function PositionQuizzesPage({ params }) {
  const position = await db.position.findUnique({
    where: { id: params.positionId },
    include: {
      quizzes: {
        include: {
          groups: {
            include: {
              questions: true,
            },
          },
        },
      },
    },
  });

  if (!position) return <div>Position not found</div>;

  const quizzes = position.quizzes ?? [];
  const groups = quizzes.flatMap((quiz) => quiz.groups ?? []);

  const totalGroups = groups.length;

  const totalQuestions = groups.reduce(
    (acc, group) => acc + group.questions.length,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Quizzes for {position.title}</h1>

      {/* ✅ AUTO-SYNCED SUMMARY */}
      {/* <div className="border rounded p-4 max-w-md space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Groups</p>
          <p className="text-xl font-semibold">{totalGroups}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total Questions</p>
          <p className="text-xl font-semibold">{totalQuestions}</p>
        </div>
      </div> */}

      {/* Create quiz */}
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

      {/* Quiz list */}
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
