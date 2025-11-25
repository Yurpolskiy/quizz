import axios from "axios";

import {QuizListItem, Quiz} from "@/app/types/quiz";

const API_URL = process.env.API_URL || "http://localhost:3000/quizzes";

export const api = {
    getQuizzes: async(): Promise<QuizListItem[]> => {
        const {data} = await axios.get(API_URL);
        return data
    },

    createQuiz: async(quiz: any): Promise<Quiz> => {
        const {data} = await axios.post(`${API_URL}/`, quiz);
        return data
    },

    deleteQuiz: async(id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

  getQuizById: async (id: number): Promise<Quiz> => {
    try {
      console.log('Fetching quiz with id:', id)
      const response = await axios.get(`${API_URL}/${id}`)
      console.log('Quiz response:', response.data)
      return response.data
    } catch (error) {
      console.error('API error getQuizById:', error)
      throw error
    }
  },
}