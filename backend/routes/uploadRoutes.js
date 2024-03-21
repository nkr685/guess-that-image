const express = require('express')

const {
    uploadNewQuiz
} = require('../controllers/uploadController.js')

const router = express.Router()

// login
router.post('/', uploadNewQuiz)

module.exports = router
