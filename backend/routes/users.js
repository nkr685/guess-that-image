const express = require('express')

const {
    loginUser,
    signUpUser
} = require('../controllers/userController.js')

const router = express.Router()

// login
router.post('/login', loginUser)

// signup
router.post('/signup', signUpUser)

module.exports = router
