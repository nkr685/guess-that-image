const express = require('express')

const {
    getImages,
    createImages
} = require('../controllers/imageController.js')

const router = express.Router()

// get all images by array of ids
router.get('/', getImages) 

// create images and returns array of ids
router.post('/', createImages)

module.exports = router
