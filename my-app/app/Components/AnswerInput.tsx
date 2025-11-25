import React from "react";
import { cn } from "@/app/utils/cn";

interface AnswerInputProps {
  value: string;
  isCorrect: boolean;
  onChange: (field: "text" | "isCorrect", value: string | boolean) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  isCorrect,
  onChange,
  onRemove,
  showRemove = false,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange("text", e.target.value)}
        placeholder="Answer text"
        className={cn(
          "flex-1 border border-border-color rounded-lg p-2 placeholder-accent" +
            "text-text-primary focus:ring-2 focus:ring-accent focus:outline-none transition",
        )}
        required
      />
      <label className="flex items-center gap-2 bg-surface px-3 py-2 rounded-lg cursor-pointer hover:bg-btn-secondary transition">
        <input
          type="checkbox"
          checked={isCorrect}
          onChange={(e) => onChange("isCorrect", e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-accent"
        />
        <span className="text-sm font-medium">Correct</span>
      </label>
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-error hover:text-error-light px-2 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default AnswerInput;
