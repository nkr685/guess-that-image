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

const createQuiz = async (req, res) => {
    const quizData  = req.body;
    const quizId = new mongoose.Types.ObjectId();
    const quizWithId = { ...quizData, _id: quizId };
    console.log(quizData)
    console.log(quizWithId)
    await Quiz.create(quizWithId);
    res.status(201).json({ createdObjectId: quizId }); // Return the created ObjectId in a JSON object
}

module.exports = {
    getQuizzes, createQuiz
}