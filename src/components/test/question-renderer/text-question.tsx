import { Textarea } from "@/components/ui/textarea";

export function TextQuestion({ question, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <p className="font-medium">{question.question}</p>
      <Textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here..."
      />
    </div>
  );
}
