import { useReducer } from "react";

type QuizOptionProps = {
  optionNumber: number;
  optionText: string;
  correct: boolean;
  disabled: boolean;
  onSelect: (optionIdx: number) => void;
};

export function QuizOption({
  optionNumber,
  optionText,
  correct,
  onSelect,
  disabled
}: QuizOptionProps) {
  const [clicked, click] = useReducer(() => true, false);
  const className = correct ? "correct" : "incorrect";

  return (
    <p
      className={`bi option text-brand border border-3 fs-2 shadow-sm ${
        clicked ? className : ""
      }`}
      onClick={() => {
        if (disabled) return;
        onSelect(optionNumber);
        click();
      }}
    >
      <span className="mark">{optionNumber}</span>
      <span className="option-text">{optionText}</span>
    </p>
  );
}
