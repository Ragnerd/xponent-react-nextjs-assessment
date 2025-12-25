import { db } from "@/lib/db";
import Link from "next/link";

export default async function TestsPage() {
  const tests = await db.test.findMany({
    include: { quiz: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Tests</h1>

      {tests.map((t) => (
        <div key={t.id} className="border p-3 rounded">
          <div className="font-medium">{t.name}</div>
          <div className="text-sm text-muted-foreground">
            {t.quiz.title} · {t.durationMin} min
          </div>

          <Link
            href={`/admin/tests/${t.id}`}
            className="text-blue-600 underline text-sm"
          >
            View Test
          </Link>
        </div>
      ))}
    </div>
  );
}
