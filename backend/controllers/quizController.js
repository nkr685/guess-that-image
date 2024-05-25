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


const getRandomQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.aggregate([{ $sample: { size: 1 } }])
        return res.status(200).json(quiz)
    } catch (error) {
        return res.status(500).json({error: 'GET Cant random'})
    }
}

const createQuiz = async (req, res) => {
    const quizData  = req.body;
    await Quiz.create(quizData)
    res.status(201).json({ createdObjectId: quizData["_id"] }) // Return the created ObjectId in a JSON object
}

const updateQuiz = async (req, res) => {
    const quizData = req.body
    const id = quizData._id
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'UPDATE invalid id'})
    }
    const updatedQuizData = await Quiz.findOneAndUpdate(
        { _id: id },
        { $set: quizData }, 
        { new: true } 
    ).exec() 
    if (!updatedQuizData) {
        res.status(404).json({error: "UPDATE no such quiz"})
    }
    console.log(updatedQuizData)
    res.status(200).json(updatedQuizData)
}

module.exports = {
    getQuizzes, createQuiz, getQuiz, updateQuiz, getRandomQuiz
}