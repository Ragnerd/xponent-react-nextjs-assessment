"use client";

import { useEffect, useState } from "react";

export default function TestClient({ assigned }) {
  const durationMs = assigned.test.durationMin * 60 * 1000;

  const [started, setStarted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const [answers, setAnswers] = useState({});

  // ⏱ TIMER
  useEffect(() => {
    if (!started || locked) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          handleSubmit(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, locked]);

  function format(ms) {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  // 📝 ANSWER HANDLERS
  function handleTextChange(qId, value) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  }

  function handleMCQChange(qId, choiceId) {
    setAnswers((prev) => {
      const existing = prev[qId] || [];
      return {
        ...prev,
        [qId]: existing.includes(choiceId)
          ? existing.filter((id) => id !== choiceId)
          : [...existing, choiceId],
      };
    });
  }

  // 📤 SUBMIT
  async function handleSubmit(auto = false) {
    setLocked(true);

    await fetch("/api/submit-test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assignedTestId: assigned.id,
        answers,
        auto,
      }),
    });
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          {assigned.test.name}
        </h1>

        {started && (
          <span className="font-bold text-red-600">
            ⏱ {format(timeLeft)}
          </span>
        )}
      </div>

      {!started && (
        <button
          onClick={() => setStarted(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Start Test
        </button>
      )}

      {/* QUESTIONS */}
      {assigned.test.groups.flatMap((tg) =>
        tg.group.questions.map((q, idx) => (
          <div key={q.id} className="border p-4 rounded space-y-2">
            <p className="font-medium">
              {idx + 1}. {q.text}
            </p>

            {/* TEXT */}
            {q.type === "TEXT" && (
              <textarea
                disabled={!started || locked}
                className="w-full border p-2"
                rows={4}
                onChange={(e) =>
                  handleTextChange(q.id, e.target.value)
                }
              />
            )}

            {/* MCQ (multi-select allowed) */}
            {q.type === "MCQ" &&
              q.choices.map((c) => (
                <label key={c.id} className="flex gap-2">
                  <input
                    type="checkbox"
                    disabled={!started || locked}
                    onChange={() =>
                      handleMCQChange(q.id, c.id)
                    }
                  />
                  {c.text}
                </label>
              ))}
          </div>
        ))
      )}

      {/* SUBMIT */}
      {started && !locked && (
        <button
          onClick={() => handleSubmit(false)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Test
        </button>
      )}

      {locked && (
        <p className="text-gray-500">
          Test submitted. Answers locked.
        </p>
      )}
    </div>
  );
}
