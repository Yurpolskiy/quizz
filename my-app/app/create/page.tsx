"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/app/api/api";
import QuestionForm from "@/app/Components/QuestionForm";
import { Button } from "@/app/Components/Button";
import { IQuestion, IQuestionForm } from "@/app/types/questionform";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      text: "",
      type: "MULTIPLE",
      answers: [{ text: "", isCorrect: false }],
    },
  ]);
  const router = useRouter();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; questions: IQuestion[] }) => {
      return await api.createQuiz(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success("Quiz created successfully! 🥳");
      return router.push("/quizzes");
    },
    onError: () => {
      console.error("Failed to create quiz");
      toast.error("Failed to create quiz 😞");
      return router.push("/quizzes");
    },
  });

  const updateQuestion = (index: number, data: IQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = data;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        type: "MULTIPLE",
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title cannot be empty( 😞");
      return;
    }

    const invalidQuestions = questions.filter(
      (q) =>
        !q.text.trim() || !q.answers.some((a) => a.isCorrect && a.text.trim()),
    );

    if (invalidQuestions.length > 0) {
      toast.error(
        "Each question must have text and at least one correct answer",
      );
      return;
    }

    createMutation.mutate({ title, questions });
  };
  return (
    <>
      <h1 className="text-4xl font-bold mb-8 text-text-primary">
        Create New Quiz
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-elevated p-6 rounded-lg border border-border-color shadow-sm">
          <label className="block text-sm font-medium mb-2 text-text-secondary">
            Quiz Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-border-color shadow-sm
                        rounded-lg p-3 bg-surface text-text-primary focus:ring-2 focus:ring-accent
                        focus:outline-none  transition "
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

        <Button
          type="button"
          onClick={addQuestion}
          className="w-full border-2 border-dashed border-border-color
                    rounded-lg p-4 hover:bg-surface text-text-secondary font-medium transition"
        >
          + Add Question
        </Button>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create Quiz"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => redirect("/")}
            disabled={createMutation.isPending}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
}
