import React from 'react'
import {cn} from "@/app/utils/cn";

interface Answer {
  id?: number
  text: string
  isCorrect: boolean
}

interface QuestionDisplayProps {
  questionNumber: number
  text: string
  answers: Answer[]
  questionId: number
  selectedAnswer?: string
  onAnswerChange: (questionId: number, answer: string) => void
  showResults: boolean
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questionNumber,
  text,
  answers,
  questionId,
  selectedAnswer,
  onAnswerChange,
  showResults
}) => {
  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <h3 className="font-semibold mb-4 text-lg">
        {questionNumber}. {text}
      </h3>

      <div className="space-y-2">
        {answers.map((answer, index) => {
          const isCorrect = answer.isCorrect
          const isSelected = selectedAnswer === answer.text

          return (
            <label
              key={index}
              className={cn(
                'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition',
                !showResults && 'hover:bg-gray-50 hover:shadow-sm',
                showResults && isCorrect && 'bg-green-100 border-green-500',
                showResults && isSelected && !isCorrect && 'bg-red-100 border-red-500',
                !showResults && 'hover:border-blue-300'
              )}
            >
              <input
                type="radio"
                name={`question-${questionId}`}
                value={answer.text}
                checked={isSelected}
                onChange={(e) => onAnswerChange(questionId, e.target.value)}
                disabled={showResults}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="flex-1">{answer.text}</span>
              {showResults && isCorrect && (
                <span className="text-green-600 font-semibold">✓ Correct</span>
              )}
              {showResults && isSelected && !isCorrect && (
                <span className="text-red-600 font-semibold">✗ Wrong</span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionDisplay
