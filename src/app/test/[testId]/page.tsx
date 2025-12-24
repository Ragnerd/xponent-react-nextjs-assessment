"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { mockQuizzes } from "@/components/data/mock-quizzes";
import { mockTests } from "@/components/data/mock-tests";
import { useCountdownTimer } from "@/components/hooks/use-countdown-timer";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { MCQQuestion } from "@/components/test/question-renderer/mcq-question";
import { TextQuestion } from "@/components/test/question-renderer/text-question";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const { testId } = useParams();
  const router = useRouter();

  const test = mockTests.find((t) => t.id === testId);
  const quiz = mockQuizzes.find((q) => q.id === test?.quizId);

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<any>({});

  if (!test || !quiz) return <p>Test not found</p>;

  const handleAutoSubmit = () => {
    console.log("Auto submitted:", answers);
    router.push("/test/submitted");
  };

  const timer = useCountdownTimer(test.durationMinutes, handleAutoSubmit);

  if (!started) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">{test.testName}</h1>
        <p>Duration: {test.durationMinutes} minutes</p>
        <Button onClick={() => setStarted(true)}>Start Test</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CountdownTimer {...timer} />

      {quiz.groups.map((group) => (
        <div key={group.id} className="space-y-4">
          <h2 className="text-lg font-semibold">{group.title}</h2>

          {group.questions.map((q: any) => (
            <div key={q.id} className="border p-4 rounded">
              {q.type === "mcq" ? (
                <MCQQuestion
                  question={q}
                  value={answers[q.id]}
                  onChange={(val: any) =>
                    setAnswers({ ...answers, [q.id]: val })
                  }
                />
              ) : (
                <TextQuestion
                  question={q}
                  value={answers[q.id]}
                  onChange={(val: any) =>
                    setAnswers({ ...answers, [q.id]: val })
                  }
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <Button onClick={handleAutoSubmit}>Submit Test</Button>
    </div>
  );
}
