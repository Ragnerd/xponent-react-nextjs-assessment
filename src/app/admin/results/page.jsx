"use client";
import { mockResults } from "@/components/data/mock-results";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminResultsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Results</h1>

      {mockResults.map((result) => (
        <Card key={result.testId}>
          <CardContent className="space-y-4 py-4">
            <div>
              <p className="font-semibold">{result.candidate}</p>
              <p>
                Score: {result.totalScore} / {result.maxScore}
              </p>
            </div>

            {result.details.map((d, idx) => (
              <div key={idx} className="border rounded p-3 space-y-2">
                <p className="font-medium">{d.question}</p>

                {d.type === "mcq" ? (
                  <p>
                    MCQ Score: {d.score} / {d.maxScore}
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Answer: {d.answer}
                    </p>
                    <Input
                      type="number"
                      placeholder={`Score (0 - ${d.maxScore})`}
                    />
                  </>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
