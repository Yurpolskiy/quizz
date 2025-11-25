import React from 'react'
import {cn} from "@/app/utils/cn";

interface AnswerInputProps {
  value: string
  isCorrect: boolean
  onChange: (field: 'text' | 'isCorrect', value: string | boolean) => void
  onRemove?: () => void
  showRemove?: boolean
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  value,
  isCorrect,
  onChange,
  onRemove,
  showRemove = false
}) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange('text', e.target.value)}
        placeholder="Answer text"
        className={cn(
          'flex-1 border rounded-lg p-2',
          'focus:ring-2 focus:ring-blue-500 focus:outline-none',
          'transition'
        )}
        required
      />
      <label className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
        <input
          type="checkbox"
          checked={isCorrect}
          onChange={(e) => onChange('isCorrect', e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
        <span className="text-sm font-medium">Correct</span>
      </label>
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 px-2 transition"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default AnswerInput
