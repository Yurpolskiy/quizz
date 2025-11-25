'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/app/api/api'
import { Quiz } from '@/app/types/quiz'
import { Button } from '@/app/Components/Button'
import Link from 'next/link'
import {useQuery, useQueryClient} from "@tanstack/react-query";

export default function ViewQuiz() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
    const {data, error, isLoading} = useQuery({
        queryKey: ['quiz', 'view-item'],
        queryFn:  () => api.getQuizById(Number(params.id)),
        retry: 1
    })

    useEffect(() => {
        setQuiz(data || null)
    }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <div className="text-xl text-text-muted">Loading quiz...</div>
      </div>
    )
  }

  if (!quiz || error) {
    return (
        <div className="bg-error-light border border-error text-error px-4 py-3 rounded-lg">
          <p className="font-bold">Quiz not found</p>
            <p className="font-bold">{error?.message || "Failed to load the quiz"}</p>
          <Button variant="primary" onClick={() => router.push('/')} className="mt-4">
            Back to Quizzes
          </Button>
        </div>
    )
  }

  return (
      <>
<div className="mb-8">
  <h1 className="text-4xl font-bold mb-2 text-text-primary">{quiz.title}</h1>
  <p className="text-text-muted">
    {quiz.questions?.length || 0} questions
  </p>
</div>

<div className="space-y-6">
  {quiz.questions?.map((question, qIndex) => (
    <div
      key={question.id}
      className="border border-border-color p-6 rounded-lg bg-elevated shadow-sm"
    >
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-text-primary">
            Question {qIndex + 1}
          </h3>
          <span className="text-sm px-3 py-1 bg-surface rounded-full text-text-secondary">
            {question.type}
          </span>
        </div>
        <p className="text-text-primary">{question.text}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary mb-2">Answers:</p>
        {question.answers?.map((answer) => (
          <div
            key={answer.id}
            className={`flex items-center gap-3 p-3 border rounded-lg ${
              answer.isCorrect
                ? 'bg-success-light border-success'
                : 'bg-surface border-border-color'
            }`}
          >
            <span className="flex-1 text-text-primary">{answer.text}</span>
            {answer.isCorrect && (
              <span className="text-success font-semibold text-sm">
                ✓ Correct Answer
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

<div className="mt-8 flex gap-4">
  <Button variant="primary" onClick={() => router.push('/')}>
    Back to Quizzes
  </Button>
</div>
</>


  )
}
