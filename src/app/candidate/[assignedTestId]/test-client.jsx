"use client";

import { useEffect, useState } from "react";
import { submitTest } from "./actions";

export default function TestClient({ assigned }) {
  const [expiresAt, setExpiresAt] = useState(
    assigned.expiresAt ? new Date(assigned.expiresAt) : null
  );
  const [timeLeft, setTimeLeft] = useState(null);
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(!!assigned.startedAt);

  // 🔐 START TEST (server-authoritative)
  async function startTest() {
    const res = await fetch("/api/candidate/start-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignedTestId: assigned.id }),
    });

    const data = await res.json();
    setStarted(true);
    setExpiresAt(new Date(data.expiresAt));
  }

  // ⏱ TIMER (derived from expiresAt)
  useEffect(() => {
    if (!expiresAt) return;

    const tick = () => {
      const diff = expiresAt.getTime() - Date.now();
      setTimeLeft(Math.max(0, Math.floor(diff / 1000)));

      if (diff <= 0) {
        submitTest({ assignedTestId: assigned.id, answers, auto: true });
      }
    };

    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [expiresAt]);

  function handleChange(questionId, value) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-xl font-semibold">{assigned.test.name}</h1>

      {!started && (
        <button className="bg-black text-white px-6 py-2" onClick={startTest}>
          Start Test
        </button>
      )}

      {started && timeLeft !== null && (
        <p className="text-red-600 font-medium">
          Time left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </p>
      )}

      {assigned.test.groups.flatMap((tg) =>
        tg.group.questions.map((q, i) => (
          <div key={q.id} className="border p-4 rounded">
            <p>
              {i + 1}. {q.text}
            </p>

            {q.type === "TEXT" && (
              <textarea
                disabled={!started}
                className="border w-full mt-2"
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}

            {q.type === "MCQ" && (
              <div className="mt-2 space-y-1">
                {q.choices.map((c) => (
                  <label key={c.id} className="block">
                    <input
                      type="checkbox"
                      disabled={!started}
                      onChange={(e) => handleChange(q.id, c.id)}
                    />{" "}
                    {c.text}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {started && (
        <button
          className="bg-green-600 text-white px-6 py-2"
          onClick={() =>
            submitTest({ assignedTestId: assigned.id, answers, auto: false })
          }
        >
          Submit Test
        </button>
      )}
    </div>
  );
}
