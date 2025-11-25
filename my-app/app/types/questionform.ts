export interface IAnswer {
    text: string,
    isCorrect: boolean
}

export interface IQuestionForm {
    questionNumber: number,
    initialData?: {
        text: string,
        type: 'MULTIPLE' | 'BOOLEAN' | 'TEXT',
        answers: IAnswer[]
    }
    onChange: (data: any) => void,
    onRemove?: () => void,
    showRemove?: boolean
}

export interface IQuestion {
    text: string,
    type: 'MULTIPLE' | 'BOOLEAN' | 'TEXT',
    answers: IAnswer[]
}