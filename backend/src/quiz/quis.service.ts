import prisma from "../utils/prisma";
import { IAnswer, IQuestion, IQuiz } from "./quiz.interfaces";

export const createQuiz = async (data: IQuiz) => {
  // return prisma.quiz.create({
  //     data: {
  //         title: data.title,
  //         questions: data.questions,
  //     },
  //     include: {
  //         questions: {
  //             include: {
  //                 answers: true,
  //             },
  //         },
  //     },
  // });

  // Як на мене так краще ?

  // На помилочку

  console.log("Data: ", JSON.stringify(data));
  console.log("Questions: ", JSON.stringify(data.questions));
  console.log("Is array: ", Array.isArray(data.questions));
  return prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((question: IQuestion) => ({
          text: question.text,
          type: question.type,
          answers: {
            create: question.answers.map((answer: IAnswer) => ({
              text: answer.text,
              isCorrect: answer.isCorrect,
            })),
          },
        })),
      },
    },
  });
};

export const listQuizzes = async () => {
  const quizzes = await prisma.quiz.findMany({
    select: {
      id: true,
      title: true,
      questions: {
        select: {
          id: true,
        },
      },
    },
  });

  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    questionsCount: quiz.questions?.length,
  }));
};

export const getQuiz = async (id: number) => {
  return prisma.quiz.findUnique({
    where: { id },

    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
    // Залишимо createdAt & updateAt для прикладу
  });
};

export const deleteQuiz = async (id: number) => {
  return await prisma.quiz.delete({ where: { id } });
};
