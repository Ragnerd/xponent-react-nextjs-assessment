import { db } from "@/lib/db";
import { createTest } from "./actions";

export default async function CreateTestPage() {
  const quizzes = await db.quiz.findMany();
  const groups = await db.group.findMany(); // 🔑 FETCH GROUPS DIRECTLY

  return (
    <form action={createTest} className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold">Create Test</h1>

      {/* Quiz */}
      <select name="quizId" required className="border p-2 w-full">
        <option value="">Select Quiz</option>
        {quizzes.map((q) => (
          <option key={q.id} value={q.id}>
            {q.title}
          </option>
        ))}
      </select>

      {/* Test Name */}
      <input
        name="name"
        placeholder="Test name"
        className="border p-2 w-full"
        required
      />

      {/* Test Date */}
      <input
        type="datetime-local"
        name="testDate"
        className="border p-2 w-full"
        required
      />

      {/* Duration */}
      <input
        type="number"
        name="durationMin"
        placeholder="Duration (minutes)"
        className="border p-2 w-full"
        required
      />

      {/* Groups */}
      <div className="space-y-2">
        <p className="font-medium">Select Question Groups</p>

        {groups.length === 0 && (
          <p className="text-sm text-gray-500">No groups found</p>
        )}

        {groups.map((g) => (
          <label key={g.id} className="flex gap-2 text-sm">
            <input type="checkbox" name="groupIds" value={g.id} />
            {g.name}
          </label>
        ))}
      </div>

      <button className="bg-black text-white px-6 py-2 rounded">
        Assign Test
      </button>
    </form>
  );
}
