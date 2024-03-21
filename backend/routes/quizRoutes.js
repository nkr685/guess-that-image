const express = require('express')

const {
    getQuizzes,
    createQuiz,
    getQuiz
} = require('../controllers/quizController.js')

const router = express.Router()

// get all quizzes
router.get('/', getQuizzes) 
router.get('/:quizID', getQuiz) 


// creates quiz and returns quiz id
router.post('/', createQuiz)

module.exports = router
