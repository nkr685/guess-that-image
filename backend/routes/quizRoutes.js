const express = require('express')

const {
    getQuizzes,
    createQuiz,
    getQuiz,
    getRandomQuiz,
    updateQuiz
} = require('../controllers/quizController.js')

const router = express.Router()

// get all quizzes
router.get('/Random', getRandomQuiz) 

router.get('/', getQuizzes) 

router.get('/:quizID', getQuiz) 



router.patch('/:id', updateQuiz)

// creates quiz and returns quiz id
router.post('/', createQuiz)

module.exports = router
