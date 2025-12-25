import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuizCard({ totalGroups, totalQuestions }) {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <h2 className="text-lg font-semibold">Quiz Summary</h2>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">Groups</p>
            <p className="text-2xl font-semibold">{totalGroups}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Questions</p>
            <p className="text-2xl font-semibold">{totalQuestions}</p>
          </div>
        </div>

        <Link href="/admin/tests/create">
          <Button size="sm">Create Test</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
