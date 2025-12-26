"use client";

import { useEffect, useState, useCallback } from "react";

export default function TestClient({ assigned, previewMode = false }) {
  // Safeguard duration
  const durationMs = Math.max(assigned.test.durationMin ?? 1, 1) * 60 * 1000;

  const [started, setStarted] = useState(false);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationMs);
  const [answers, setAnswers] = useState({});

  // Auto-start preview mode (read-only)
  useEffect(() => {
    if (previewMode) {
      setStarted(true);
      setLocked(true);
    }
  }, [previewMode]);

  // Submit handler
  const handleSubmit = useCallback(
    async (auto = false) => {
      // Preview: never submit
      if (previewMode) {
        setLocked(true);
        return;
      }

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
    },
    [previewMode, assigned.id, answers]
  );

  // Timer
  useEffect(() => {
    if (!started || locked || previewMode) return;

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
  }, [started, locked, previewMode, handleSubmit]);

  function format(ms) {
    const total = Math.floor(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  // Answer handlers
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

  const questions = assigned.test.groups.flatMap((tg) => tg.group.questions);

  return (
    <div className="max-w-3xl space-y-6">
      {/* PREVIEW BANNER */}
      {previewMode && (
        <div className="p-3 rounded bg-yellow-100 text-yellow-800 text-sm">
          Admin Preview Mode — answers will not be saved
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">{assigned.test.name}</h1>

        {!previewMode && started && (
          <span className="font-bold text-red-600">{format(timeLeft)}</span>
        )}
      </div>

      {/* START BUTTON (CANDIDATE ONLY) */}
      {!started && !previewMode && (
        <button
          onClick={() => setStarted(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Start Test
        </button>
      )}

      {/* QUESTIONS */}
      {questions.map((q, idx) => (
        <div key={q.id} className="border p-4 rounded space-y-2">
          <p className="font-medium">
            {idx + 1}. {q.text}
          </p>

          {/* TEXT */}
          {q.type === "TEXT" && (
            <textarea
              disabled={!started || locked || previewMode}
              className="w-full border p-2"
              rows={4}
              onChange={(e) => handleTextChange(q.id, e.target.value)}
            />
          )}

          {/* MCQ */}
          {q.type === "MCQ" &&
            q.choices.map((c) => (
              <label key={c.id} className="flex gap-2">
                <input
                  type="checkbox"
                  disabled={!started || locked || previewMode}
                  onChange={() => handleMCQChange(q.id, c.id)}
                />
                {c.text}
              </label>
            ))}
        </div>
      ))}

      {/* SUBMIT */}
      {started && !locked && !previewMode && (
        <button
          onClick={() => handleSubmit(false)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Test
        </button>
      )}

      {/* FOOTER MESSAGE */}
      {locked && (
        <p className="text-gray-500">
          {previewMode
            ? "Preview completed. No answers were saved."
            : "Test submitted. Answers locked."}
        </p>
      )}
    </div>
  );
}
