import { mockQuizzes } from "../../../components/data/mock-quizzes";
import { QuizCard } from "../../../components/quiz/quiz-card";

export default function AdminQuizzesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quizzes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
