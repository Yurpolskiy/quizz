import React, { useState } from 'react'
import AnswerInput from './AnswerInput'
import {cn} from "@/app/utils/cn";

interface Answer {
  text: string
  isCorrect: boolean
}

interface QuestionFormProps {
  questionNumber: number
  initialData?: {
    text: string
    type: 'MULTIPLE' | 'BOOLEAN' | 'TEXT'
    answers: Answer[]
  }
  onChange: (data: any) => void
  onRemove?: () => void
  showRemove?: boolean
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  questionNumber,
  initialData,
  onChange,
  onRemove,
  showRemove = false
}) => {
  const [question, setQuestion] = useState(initialData || {
    text: '',
    type: 'MULTIPLE' as const,
    answers: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  })

  const updateQuestion = (field: string, value: any) => {
    const updated = { ...question, [field]: value }
    setQuestion(updated)
    onChange(updated)
  }

  const updateAnswer = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
    const newAnswers = [...question.answers]
    newAnswers[index] = { ...newAnswers[index], [field]: value }
    updateQuestion('answers', newAnswers)
  }

  const addAnswer = () => {
    updateQuestion('answers', [...question.answers, { text: '', isCorrect: false }])
  }

  const removeAnswer = (index: number) => {
    if (question.answers.length > 2) {
      updateQuestion('answers', question.answers.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="border rounded-xl p-6 space-y-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Question {questionNumber}</h3>
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-600 hover:text-red-800 text-sm font-medium transition"
          >
            Remove Question
          </button>
        )}
      </div>

      <input
        type="text"
        value={question.text}
        onChange={(e) => updateQuestion('text', e.target.value)}
        placeholder="Question text"
        className={cn(
          'w-full border rounded-lg p-3',
          'focus:ring-2 focus:ring-blue-500 focus:outline-none',
          'transition'
        )}
        required
      />

      <select
        value={question.type}
        onChange={(e) => updateQuestion('type', e.target.value)}
        className={cn(
          'border rounded-lg p-3',
          'focus:ring-2 focus:ring-blue-500 focus:outline-none',
          'transition'
        )}
      >
        <option value="MULTIPLE">Multiple Choice</option>
        <option value="BOOLEAN">True/False</option>
        <option value="TEXT">Text Answer</option>
      </select>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Answers:</p>
        {question.answers.map((answer, index) => (
          <AnswerInput
            key={index}
            value={answer.text}
            isCorrect={answer.isCorrect}
            onChange={(field, value) => updateAnswer(index, field, value)}
            onRemove={() => removeAnswer(index)}
            showRemove={question.answers.length > 2}
          />
        ))}
        <button
          type="button"
          onClick={addAnswer}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
        >
          + Add Answer
        </button>
      </div>
    </div>
  )
}

export default QuestionForm
