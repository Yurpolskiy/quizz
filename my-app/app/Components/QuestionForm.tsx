"use client";
import React, { useEffect, useState } from "react";
import AnswerInput from "./AnswerInput";
import { cn } from "@/app/utils/cn";

import { IQuestionForm, IAnswer } from "@/app/types/questionform";
import Button from "@/app/Components/Button";

//!TODO потiм розбити компонент
export const QuestionForm: React.FC<IQuestionForm> = ({
  questionNumber,
  initialData,
  onChange,
  onRemove,
  showRemove = false,
}) => {
  const [question, setQuestion] = useState(
    initialData || {
      text: "",
      type: "MULTIPLE" as const,
      answers: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  );

  useEffect(() => {
    if (question.type === "BOOLEAN") {
      setQuestion((prev) => {
        const updated = {
          ...prev,
          answers: [
            { text: "True", isCorrect: false },
            { text: "False", isCorrect: false },
          ],
        };
        onChange(updated);
        return updated;
      });
    } else if (question.type === "TEXT") {
      setQuestion((prev) => {
        const updated = {
          ...prev,
          answers: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        };
        onChange(updated);
        return updated;
      });
    }
  }, [question.type]);

  //!TODO Потiм винести в окремий хук
  const updateQuestion = (field: string, value: any) => {
    const updated = { ...question, [field]: value };
    setQuestion(updated);
    onChange(updated);
  };

  const updateAnswer = (
    index: number,
    field: "text" | "isCorrect",
    value: string | boolean,
  ) => {
    const newAnswers = [...question.answers];
    if (field === "isCorrect" && value === true) {
      if (question.type === "BOOLEAN" || question.type === "TEXT") {
        newAnswers.forEach((item, i) => {
          if (i !== index) item.isCorrect = false;
        });
      }
    }
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    updateQuestion("answers", newAnswers);
  };

  const addAnswer = () => {
    if (question.type !== "BOOLEAN") {
      updateQuestion("answers", [
        ...question.answers,
        { text: "", isCorrect: false },
      ]);
    }
  };

  const removeAnswer = (index: number) => {
    if (question.answers.length > 2 && question.type !== "BOOLEAN") {
      updateQuestion(
        "answers",
        question.answers.filter((_, i) => i !== index),
      );
    }
  };

  return (
    <div
      className="border rounded-lg border-border-color
     p-6 space-y-4 bg-elevated shadow-sm"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-text-primary">
          Question {questionNumber}
        </h3>
        {showRemove && (
          <Button
            type="button"
            onClick={onRemove}
            className="text-sm"
            variant={"danger"}
          >
            Remove Question
          </Button>
        )}
      </div>

      <input
        type="text"
        value={question.text}
        onChange={(e) => updateQuestion("text", e.target.value)}
        placeholder="Question text"
        className={cn(
          " border  border-border-color rounded-lg p-3 bg-surface" +
            "text-text-secondary " +
            "focus:ring-2 focus:ring-accent focus:outline-none transition",
        )}
        required
      />

      <select
        value={question.type}
        onChange={(e) => updateQuestion("type", e.target.value)}
        className={cn(
          "border ml-4 border-border-color rounded-lg p-3 bg-surface text-text-primary" +
            "focus:ring-2 focus:ring-accent focus:outline-none transition",
        )} // !TODO Потiм в окремий компонент винести
      >
        <option value="MULTIPLE">Multiple Choice</option>
        <option value="BOOLEAN">True/False</option>
        <option value="TEXT">Text Answer</option>
      </select>

      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">Answers:</p>
        {question.answers.map((answer, index) => (
          <AnswerInput
            key={index}
            value={answer.text}
            isCorrect={answer.isCorrect}
            onChange={(field, value) => updateAnswer(index, field, value)}
            onRemove={() => removeAnswer(index)}
            showRemove={
              question.type === "MULTIPLE" && question.answers.length > 2
            }
            disabled={question.type === "BOOLEAN"}
          />
        ))}
        {question.type !== "BOOLEAN" && (
          <button
            type="button"
            onClick={addAnswer}
            className="text-accent hover:text-accent-hover text-sm font-medium transition"
          >
            + Add Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;
// Трохи величкий компонент =)
