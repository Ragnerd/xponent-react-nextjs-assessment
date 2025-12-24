import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuizCard({ quiz }: { quiz: any }) {
  const groups = quiz?.groups ?? [];
  const totalQuestions = groups.reduce(
    (acc: number, group: any) => acc + (group?.questions?.length ?? 0),
    0
  );

  return (
    <Card className="">
      <CardHeader className="">
        <h2 className="text-lg font-semibold">{quiz?.title}</h2>
        <p className="text-sm text-muted-foreground">
          Position: {quiz?.position}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>Groups: {groups.length}</p>
        <p>Total Questions: {totalQuestions}</p>

        <Link href={`/admin/tests/create?quizId=${quiz?.id}`}>
          <Button size="sm" variant="default" className="">
            Create Test
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
