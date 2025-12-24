import { db } from "@/lib/db";
import { createQuestion } from "./actions";

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
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Questions – {group.name}</h1>

      {/* CREATE QUESTION */}
      <form action={createQuestion} className="space-y-4 max-w-xl">
        <input type="hidden" name="groupId" value={group.id} />

        <textarea
          name="text"
          placeholder="Question text"
          className="border p-2 w-full rounded"
          required
        />

        <div className="flex gap-4">
          <select name="type" className="border p-2 rounded">
            <option value="MCQ">MCQ</option>
            <option value="TEXT">Text</option>
          </select>

          <input
            type="number"
            name="score"
            placeholder="Score"
            className="border p-2 w-24 rounded"
          />
        </div>

        {/* MCQ OPTIONS */}
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" name="correct" value={i} />
              <input
                name="options"
                placeholder={`Option ${i + 1}`}
                className="border p-2 flex-1 rounded"
              />
            </div>
          ))}
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Question
        </button>
      </form>

      {/* LIST QUESTIONS */}
      <div className="space-y-4">
        {group.questions.map((q) => (
          <div key={q.id} className="border p-3 rounded">
            <div className="font-medium">
              {q.text} ({q.type})
            </div>

            {q.type === "MCQ" && (
              <ul className="list-disc ml-5 text-sm">
                {q.choices.map((c) => (
                  <li key={c.id} className={c.isCorrect ? "font-semibold" : ""}>
                    {c.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {group.questions.length === 0 && (
          <div className="text-sm text-gray-500">No questions added yet.</div>
        )}
      </div>
    </div>
  );
}
