const Quiz = require('../models/quizModel.js')
const mongoose = require('mongoose')

// get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find({})
        return res.status(200).json(quizzes)
    } catch (error) {
        return res.status(500).json({error: 'GETALL Cant find quizzes'})
    }
}

const getQuiz = async (req, res) => {
    try {
        const quizID = req.params.quizID
        const quiz = await Quiz.findById(quizID)
        return res.status(200).json(quiz)
    } catch (error) {
        return res.status(500).json({error: 'GET Cant find quiz'})
    }
}

const createQuiz = async (req, res) => {
    const quizData  = req.body;
    await Quiz.create(quizData)
    res.status(201).json({ createdObjectId: quizData["_id"] }) // Return the created ObjectId in a JSON object
}

module.exports = {
    getQuizzes, createQuiz, getQuiz
}