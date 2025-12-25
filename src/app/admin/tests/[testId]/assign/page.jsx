import { assignInterviewee } from "./actions";

export default function AssignPage({ params }) {
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-xl font-semibold">Assign Interviewee</h1>

      <form action={assignInterviewee} className="space-y-3">
        <input type="hidden" name="testId" value={params.testId} />

        <input
          name="userId"
          placeholder="Interviewee User ID"
          className="w-full border p-2 rounded"
          required
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Assign & Start Test
        </button>
      </form>
    </div>
  );
}
