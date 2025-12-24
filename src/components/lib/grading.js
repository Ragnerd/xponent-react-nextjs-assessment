export function gradeMCQ(question, answer = []) {
  const correctOptions = question.options
    .filter((opt) => opt.correct)
    .map((opt) => opt.id);

  const isCorrect =
    correctOptions.length === answer.length &&
    correctOptions.every((id) => answer.includes(id));
  return {
    score: isCorrect ? question.points : 0,
    maxScore: question.points,
  };
}
