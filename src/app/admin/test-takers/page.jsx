"use client";

import { useState } from "react";
import { createTestTaker } from "./actions";

export default function TestTakersPage() {
  const [generated, setGenerated] = useState(null);

  async function handleSubmit(formData) {
    const res = await createTestTaker(formData);
    setGenerated(res);
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Create Test Taker</h1>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label>User ID (username)</label>
          <input
            name="userId"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Name</label>
          <input
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Password (leave empty to auto-generate)</label>
          <input name="password" className="w-full border px-3 py-2 rounded" />
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">
          Create User
        </button>
      </form>

      {generated && (
        <div className="border p-4 rounded bg-muted">
          <p className="font-semibold">Credentials Created</p>
          <p>User ID: {generated.userId}</p>
          <p>Password: {generated.password}</p>
        </div>
      )}
    </div>
  );
}
