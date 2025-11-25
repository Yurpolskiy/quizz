'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { api } from '@/app/api/api'
import { Quiz } from '@/app/types/quiz'
import { Button } from '@/app/Components/Button'
import Link from 'next/link'

export default function ViewQuiz() {
  const params = useParams()
  const router = useRouter()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuiz()
  }, [params.id])

  const loadQuiz = async () => {
    try {
      const data = await api.getQuizById(Number(params.id))
      setQuiz(data ?? null)
    } catch (error) {
      console.error('Failed to load quizzes:', error)
      alert('Failed to load quizzes')
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading quiz...</div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          <p className="font-bold">Quiz not found</p>
          <Button variant="primary" onClick={() => router.push('/')} className="mt-4">
            Back to Quizzes
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/">
          <button className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2">
            ← Back to Quizzes
          </button>
        </Link>
        <h1 className="text-4xl font-bold mb-2 text-gray-800">{quiz.title}</h1>
        <p className="text-gray-600">
          {quiz.questions?.length || 0} questions
        </p>
      </div>

      <div className="space-y-6">
        {quiz.questions?.map((question, qIndex) => (
          <div key={question.id} className="border rounded-xl p-6 bg-white shadow-sm">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  Question {qIndex + 1}
                </h3>
                <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">
                  {question.type}
                </span>
              </div>
              <p className="text-gray-800">{question.text}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Answers:</p>
              {question.answers?.map((answer, aIndex) => (
                <div
                  key={answer.id}
                  className={`flex items-center gap-3 p-3 border rounded-lg ${
                    answer.isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="flex-1">{answer.text}</span>
                  {answer.isCorrect && (
                    <span className="text-green-600 font-semibold text-sm">
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
        <Button variant="secondary" onClick={() => router.push(`/edit/${quiz.id}`)}>
          Edit Quiz
        </Button>
      </div>
    </main>
  )
}
