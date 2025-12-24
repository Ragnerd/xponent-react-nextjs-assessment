import { db } from "@/lib/db";
import Link from "next/link";
import { createPosition } from "./actions";

console.log("DB URL USED BY NEXT:", process.env.DATABASE_URL);

export default async function PositionsPage() {
  const positions = await db.position.findMany({
    orderBy: { title: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Positions</h1>

      {/* ✅ CREATE POSITION FORM */}
      <form action={createPosition} className="flex gap-2 max-w-md">
        <input
          name="title"
          placeholder="e.g. Frontend Intern"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="border px-4 py-2 rounded bg-black text-white"
        >
          Create
        </button>
      </form>

      {/* ✅ LIST POSITIONS */}
      <div className="space-y-3">
        {positions.map((p) => (
          <div key={p.id} className="border p-3 rounded">
            <div className="font-medium">{p.title}</div>
            <Link
              href={`/admin/positions/${p.id}/quizzes`}
              className="text-sm text-blue-600 underline"
            >
              View quizzes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
