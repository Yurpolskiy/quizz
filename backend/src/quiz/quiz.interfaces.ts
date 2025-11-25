interface AnswerInput {
  text: string
  isCorrect: boolean
}

interface QuestionInput {
  text: string
  type: 'MULTIPLE' | 'BOOLEAN' | 'TEXT'
  answers: {
    create: AnswerInput[]
  }
}

interface CreateQuizInput {
  title: string
  questions: {
    create: QuestionInput[]
  }
}