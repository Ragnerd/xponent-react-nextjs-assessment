"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { mockQuizzes } from "@/components/data/mock-quizzes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateTestPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const quizId = searchParams.get("quizId");
  const quiz = mockQuizzes.find((q) => q.id === quizId);

  const [testName, setTestName] = useState("");
  const [duration, setDuration] = useState(30);

  if (!quiz) {
    return <p className="text-red-500">Quiz not found</p>;
  }

  const handleCreateTest = () => {
    // Mock creation — no backend
    console.log({
      quizId: quiz.id,
      testName,
      duration,
    });

    router.push("/admin/tests");
  };

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Create Test</h1>

      <Card>
        <CardHeader>
          <h2 className="font-semibold">{quiz.title}</h2>
          <p className="text-sm text-muted-foreground">
            Position: {quiz.position}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Test Name</label>
            <Input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Frontend Interview – Round 1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Duration (minutes)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>

          <Button onClick={handleCreateTest}>Create Test</Button>
        </CardContent>
      </Card>
    </div>
  );
}
