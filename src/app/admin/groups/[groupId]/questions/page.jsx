import { db } from "@/lib/db";
import { createTextQuestion, createMcqQuestion } from "./actions";

export default async function GroupQuestionsPage({ params }) {
  const group = await db.group.findUnique({
    where: { id: params.groupId },
    include: {
      questions: {
        include: { choices: true },
      },
    },
  });

  if (!group) return <div>Group not found</div>;

  return (
    <div className="space-y-10 max-w-3xl">
      <h1 className="text-xl font-semibold">
        Questions – {group.name}
      </h1>

      {/* TEXT QUESTION */}
      <div className="border p-4 rounded space-y-3">
        <h2 className="font-medium">Add Text Question</h2>

        <form action={createTextQuestion} className="space-y-2">
          <input type="hidden" name="groupId" value={group.id} />

          <textarea
            name="text"
            placeholder="Enter question text"
            className="border p-2 w-full"
            required
          />

          <input
            type="number"
            name="score"
            placeholder="Score"
            className="border p-2 w-32"
            required
          />

          <button className="bg-black text-white px-4 py-2 rounded">
            Add Text Question
          </button>
        </form>
      </div>

      {/* MCQ QUESTION */}
      <div className="border p-4 rounded space-y-3">
        <h2 className="font-medium">Add MCQ Question</h2>

        <form action={createMcqQuestion} className="space-y-3">
          <input type="hidden" name="groupId" value={group.id} />

          <textarea
            name="text"
            placeholder="Enter question text"
            className="border p-2 w-full"
            required
          />

          <input
            type="number"
            name="score"
            placeholder="Score"
            className="border p-2 w-32"
            required
          />

          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="correctIndexes"
                  value={i}
                />
                <input
                  name={`choice-${i}`}
                  placeholder={`Option ${i + 1}`}
                  className="border p-2 flex-1"
                  required
                />
              </div>
            ))}
          </div>

          <button className="bg-black text-white px-4 py-2 rounded">
            Add MCQ Question
          </button>
        </form>
      </div>

      {/* LIST QUESTIONS */}
      <div className="space-y-4">
        <h2 className="font-medium">Existing Questions</h2>

        {group.questions.map((q) => (
          <div key={q.id} className="border p-3 rounded">
            <div className="font-medium">
              {q.text} ({q.type})
            </div>

            {q.type === "MCQ" && (
              <ul className="ml-4 list-disc">
                {q.choices.map((c) => (
                  <li key={c.id}>
                    {c.text}
                    {c.isCorrect && " ✅"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {group.questions.length === 0 && (
          <div className="text-sm text-gray-500">
            No questions added yet.
          </div>
        )}
      </div>
    </div>
  );
}
