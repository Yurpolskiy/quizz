import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import quizRouter from "./quiz/quiz.controller";

dotenv.config()
const PORT = process.env.PORT || 3000

const main = () => {
    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use(quizRouter)

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

main()