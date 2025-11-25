import prisma from "../utils/prisma";

export const createQuiz = async (data: any) => {
    return prisma.quiz.create({
        data: {
            title: data.title,
            questions: data.questions,
        },
        include: {
            questions: {
                include: {
                    answers: true,
                },
            },
        },
    });
};

export const listQuizzes = async () => {
    const  quizzes = await prisma.quiz.findMany({
        select: {
            id: true,
            title: true,
            questions: {
                select: {
                    id: true
                }
            }
        }
    })

    return quizzes.map((quiz) => ({
        id: quiz.id,
        title: quiz.title,
        questionsCount: quiz.questions?.length
    }))
}

export const getQuiz = async (id: number) => {
    return prisma.quiz.findUnique({
        where: {id},
        select: {
            id: true,
            title: true,
            questions: true
        }
    })
}

export const deleteQuiz = async (id: number) => {
    return await prisma.quiz.delete({
        where: {id}
    })
}
