import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {QuizListItem} from "@/app/types/quiz";
import {api} from "@/app/api/api";
import Link from "next/link";
import Button from "@/app/Components/Button";
import QuizCard from "@/app/Components/QuizCard";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

const QuizzesPage = () => {

    const queryClient = useQueryClient();
    const [quizzes, setQuizzes] = useState<QuizListItem[]>([])

    const {data, error, isLoading} = useQuery({
        queryKey: ['quizzes'],
        queryFn:  api.getQuizzes
    })

    useEffect(() => {
        setQuizzes(data || [])
    }, [quizzes]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this quizzes?')) return
    try {
        await api.deleteQuiz(id)
        setQuizzes(() => quizzes.filter(quiz => quiz.id !== id))
        toast.success("Quiz deleted successfully 🥳")
        await queryClient.resetQueries({queryKey: ['quizzes']})
    } catch (error) {
        console.error('Failed to delete:', error)
        toast.error("Failed to delete quiz 😞")
    }
  }

  if (isLoading) <h1>Loading...</h1>

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          <p className="font-bold">Error</p>
          <p>{`${error}`}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-surface px-4 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">All Quizzes</h1>
        <Link href="/create">
          <Button variant="primary">Create Quiz</Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg mb-4">No quizzes yet. Create one!</p>
          <Link href="/create">
            <Button variant="primary">Create Your First Quiz</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              questionsCount={quiz.questionsCount}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  )
};

export default QuizzesPage;