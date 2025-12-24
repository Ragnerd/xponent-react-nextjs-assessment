export function CountdownTimer({
  minutes,
  seconds,
}: {
  minutes: number;
  seconds: number;
}) {
  return (
    <div className="text-sm font-semibold text-red-600">
      Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
