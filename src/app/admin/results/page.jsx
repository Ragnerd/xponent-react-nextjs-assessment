import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { scoreTextAnswer } from "./actions";

export default async function AdminResultsPage() {
  const attempts = await db.assignedTest.findMany({
    where: { submittedAt: { not: null } },
    include: {
      user: true,
      test: true,
    },
  });

  const attemptsWithAnswers = await Promise.all(
    attempts.map(async (attempt) => {
      const answers = await db.userAnswer.findMany({
        where: { assignedTestId: attempt.id },
        include: { question: true },
      });

      return { ...attempt, answers };
    })
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Results</h1>

      {attemptsWithAnswers.map((attempt) => {
        const totalScore = attempt.answers.reduce(
          (sum, ans) => sum + (ans.givenScore ?? 0),
          0
        );

        const maxScore = attempt.answers.reduce(
          (sum, ans) => sum + ans.question.score,
          0
        );

        return (
          <Card key={attempt.id}>
            <CardContent className="space-y-4 py-4">
              <div>
                <p className="font-semibold">
                  {attempt.user?.name ?? "Unknown Candidate"}
                </p>
                <p>
                  Final Score:{" "}
                  <strong>
                    {totalScore} / {maxScore}
                  </strong>
                </p>
              </div>

              {attempt.answers.map((ans, idx) => (
                <div key={ans.id} className="border rounded p-3 space-y-2">
                  <p className="font-medium">
                    {idx + 1}. {ans.question.text}
                  </p>

                  {/* MCQ */}
                  {ans.question.type === "MCQ" && (
                    <p>
                      MCQ Score: {ans.givenScore ?? 0} / {ans.question.score}
                    </p>
                  )}

                  {/* TEXT */}
                  {ans.question.type === "TEXT" && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Answer: {ans.response}
                      </p>

                      <div className="flex gap-2">
                        <form action={scoreTextAnswer}>
                          <input type="hidden" name="answerId" value={ans.id} />
                          <input
                            type="hidden"
                            name="score"
                            value={ans.question.score}
                          />
                          <button className="px-3 py-1 bg-green-600 text-white rounded">
                            Accept
                          </button>
                        </form>

                        <form action={scoreTextAnswer}>
                          <input type="hidden" name="answerId" value={ans.id} />
                          <input type="hidden" name="score" value={0} />
                          <button className="px-3 py-1 bg-red-600 text-white rounded">
                            Reject
                          </button>
                        </form>

                        <form action={scoreTextAnswer} className="flex gap-1">
                          <input type="hidden" name="answerId" value={ans.id} />
                          <input
                            name="score"
                            type="number"
                            min={0}
                            max={ans.question.score}
                            className="w-20 border rounded px-2"
                            required
                          />
                          <button className="px-3 py-1 bg-gray-800 text-white rounded">
                            Save
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
