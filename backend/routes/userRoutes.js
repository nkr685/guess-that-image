const express = require('express')

const {
    loginUser,
    signUpUser,
    getUser,
    deleteUser,
    updateUser,
    getUsers
} = require('../controllers/userController.js')

const router = express.Router()
 
// login
router.post('/login', loginUser)

// signup
router.post('/signup', signUpUser)

router.get('/:id', getUser)

router.get('/', getUsers)

router.patch('/delete/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router
