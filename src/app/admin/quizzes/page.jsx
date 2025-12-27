import { db } from "@/lib/db";
import { QuizCard } from "@/components/quiz/quiz-card";

export default async function AdminQuizzesPage() {
  const positions = await db.position.findMany({
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

  // 🔹 flatten everything
  const groups = positions.flatMap((p) => p.quizzes).flatMap((q) => q.groups);

  const totalGroups = groups.length;

  const totalQuestions = groups.reduce((acc, g) => acc + g.questions.length, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quizzes</h1>

      {/* ✅ GLOBAL QUIZ SUMMARY (ONLY HERE) */}
      <QuizCard totalGroups={totalGroups} totalQuestions={totalQuestions} />
    </div>
  );
}
