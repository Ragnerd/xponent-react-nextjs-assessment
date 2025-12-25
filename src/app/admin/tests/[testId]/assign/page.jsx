"use client";

import { useState } from "react";
import { assignInterviewee } from "./actions";

export default function AssignPage({ params }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(formData) {
    setError(null);
    setSuccess(false);

    const res = await assignInterviewee(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setSuccess(true);
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

      {/* ❌ Error */}
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      {/* ✅ Success */}
      {success && (
        <p className="text-sm text-green-600 font-medium">
          Test assigned successfully
        </p>
      )}
    </div>
  );
}
