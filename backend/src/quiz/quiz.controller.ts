import {Router} from "express";
import {createQuiz, deleteQuiz, getQuiz, listQuizzes} from "./quis.service";


const quizRouter = Router();

quizRouter.post('/quizzes', async(req, res) => {
    try {
        const quiz = await createQuiz(req.body);
        res.status(201).send({
            ...quiz,
        });
    } catch(err) {
        console.log(err)
        return res.status(400).send({message:'Error creating quizzes'});
    }
})

quizRouter.get('/quizzes', async(req, res) => {
    try {
        const quizzes = await listQuizzes();
        res.status(200).send(quizzes);
    } catch(err) {
        res.status(400).send({message: err || 'Error fetching quizzes'});
    }
})

quizRouter.get('/quizzes/:id', async(req, res) => {
    try {
        const quiz = await getQuiz(Number(req.params.id))
        res.status(200).send(quiz);
    } catch(err) {
        console.log(err)
        return res.status(400).send({message: 'Error fetching quizzes'});
    }
})

quizRouter.delete('/quizzes/:id', async(req, res) => {
    try {
        const quiz = await deleteQuiz(Number(req.params.id))
        return res.status(201).send({"Message": "Quiz deleted successfully", quiz});
    } catch(err) {
        return res.status(400).send({message: "Error deleting quizzles", err});
    }
})


export default quizRouter;