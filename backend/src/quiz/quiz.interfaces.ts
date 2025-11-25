export interface IAnswer {
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  text: string;
  type: "MULTIPLE" | "BOOLEAN" | "TEXT";
  answers: IAnswer[];
}

export interface IQuiz {
  title: string;
  id: number;
  questions: IQuestion[];
}
