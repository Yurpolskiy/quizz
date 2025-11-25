'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/app/api/api'
import QuestionForm from '@/app/Components/QuestionForm'
import { Button } from '@/app/Components/Button'

export default function CreateQuiz() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([
    {
      text: '',
      type: 'MULTIPLE' as const,
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    }
  ])

  const updateQuestion = (index: number, data: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = data
    setQuestions(newQuestions)
  }

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      type: 'MULTIPLE',
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    }])
  }

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Please enter a quiz title')
      return
    }

    const invalidQuestions = questions.filter(q =>
      !q.text.trim() || !q.answers.some(a => a.isCorrect && a.text.trim())
    )

    if (invalidQuestions.length > 0) {
      alert('Each question must have text and at least one correct answer')
      return
    }

    setLoading(true)

    try {
      await api.createQuiz({
        title,
        questions: {
          create: questions.map(q => ({
            text: q.text,
            type: q.type,
            answers: {
              create: q.answers
                .filter(a => a.text.trim()) // только непустые ответы
                .map(a => ({
                  text: a.text,
                  isCorrect: a.isCorrect
                }))
            }
          }))
        }
      })

      alert('Quiz created successfully!')
      router.push('/')
    } catch (error) {
      console.error('Failed to create quiz:', error)
      alert('Failed to create quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Create New Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Quiz Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Enter quiz title..."
            required
          />
        </div>

        {questions.map((q, index) => (
          <QuestionForm
            key={index}
            questionNumber={index + 1}
            initialData={q}
            onChange={(data) => updateQuestion(index, data)}
            onRemove={() => removeQuestion(index)}
            showRemove={questions.length > 1}
          />
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full border-2 border-dashed rounded-xl p-4 hover:bg-gray-100 transition text-gray-600 font-medium"
        >
          + Add Question
        </button>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push('/')}
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </main>
  )
}
