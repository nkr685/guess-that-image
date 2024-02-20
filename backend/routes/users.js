const express = require('express')

const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/UserController.js')

const router = express.Router()

// GET all image urls
router.get('/', getUsers) 

// GET a single image url by id
router.get('/:id', getUser)

// POST a new image url
router.post('/', createUser)

// DELETE a new image url by id
router.delete('/:id', deleteUser)

// UPDATE a new image url by id
router.patch('/:id', updateUser)

module.exports = router
