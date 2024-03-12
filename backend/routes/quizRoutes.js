const express = require('express')

const {
    getQuizzes,
    createQuiz
} = require('../controllers/quizController.js')

const router = express.Router()

// get all quizzes
router.get('/', getQuizzes) 

// creates quiz and returns quiz id
router.post('/', createQuiz)

module.exports = router
