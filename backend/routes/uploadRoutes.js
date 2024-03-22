const express = require('express')

const {
    uploadGame
} = require('../controllers/uploadController.js')

const router = express.Router()

// login
router.post('/', uploadGame)

module.exports = router
