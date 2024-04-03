const express = require('express')

const {
    loginUser,
    signUpUser,
    getUser,
    deleteUser
} = require('../controllers/userController.js')

const router = express.Router()

// login
router.post('/login', loginUser)

// signup
router.post('/signup', signUpUser)

router.get('/:id', getUser)

router.delete('/delete/:id', deleteUser)

module.exports = router
