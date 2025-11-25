import React from "react";
import Link from "next/link";
import Button from "@/app/Components/Button";

interface QuizCardProps {
  id: number;
  title: string;
  questionsCount: number;
  onDelete: (id: number) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  questionsCount,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg  p-6 hover:shadow-lg transition bg-elevated">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2 text-text-primary">
            {title}
          </h2>
          <p className="text-text-muted">
            {questionsCount} {questionsCount === 1 ? "question" : "questions"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/quizzes/${id}`}
            className="bg-btn-primary text-btn-primary-text px-4 py-2
             rounded-lg hover:bg-btn-primary-hover transition shadow-btn-primary"
          >
            View
          </Link>
          <Button onClick={() => onDelete(id)} className="" variant={"danger"}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
