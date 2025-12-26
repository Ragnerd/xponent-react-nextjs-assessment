"use client";

import { useState } from "react";
import Link from "next/link";
import { assignInterviewee } from "./actions";

export default function AssignPage({ params }) {
  const [error, setError] = useState(null);
  const [assignedTestId, setAssignedTestId] = useState(null);

  async function onSubmit(formData) {
    setError(null);
    setAssignedTestId(null);

    const res = await assignInterviewee(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setAssignedTestId(res.assignedTestId);
    }
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-xl font-semibold">Assign Interviewee</h1>

      <form action={onSubmit} className="space-y-3">
        <input type="hidden" name="testId" value={params.testId} />

        <input
          name="userId"
          placeholder="Interviewee User ID"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Assign & Start Test
        </button>
      </form>

      {/* ERROR */}
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      {/* SUCCESS + PREVIEW */}
      {assignedTestId && (
        <div className="space-y-3">
          <p className="text-sm text-green-600 font-medium">
            Test assigned successfully
          </p>

          <Link
            href={`/candidate/${assignedTestId}?preview=1`}
            className="inline-block bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Preview Test (Admin)
          </Link>
        </div>
      )}
    </div>
  );
}
