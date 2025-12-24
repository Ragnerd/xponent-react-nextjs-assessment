export function MCQQuestion({ question, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <p className="font-medium">{question.question}</p>

      {question.options.map((opt: any) => (
        <label key={opt.id} className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={value?.includes(opt.id)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...(value || []), opt.id]);
              } else {
                onChange(value.filter((v: string) => v !== opt.id));
              }
            }}
          />
          {opt.text}
        </label>
      ))}
    </div>
  );
}
