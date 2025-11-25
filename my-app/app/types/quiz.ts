export interface Answer {
  id?: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id?: number;
  text: string;
  type: "MULTIPLE" | "BOOLEAN" | "TEXT";
  answers?: Answer[];
}

export interface Quiz {
  id?: number;
  title: string;
  questionsCount?: number;
  questions?: Question[];
}

export interface QuizListItem {
  id: number;
  title: string;
  questionsCount: number;
}
