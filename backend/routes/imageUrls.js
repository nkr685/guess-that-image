const express = require('express')

const {
    getImageUrls,
    getImageUrl,
    createImageUrl,
    deleteImageUrl,
    updateImageUrl
} = require('../controllers/imageUrlController.js')

const router = express.Router()

// GET all image urls
router.get('/', getImageUrls) 

// GET a single image url by id
router.get('/:id', getImageUrl)

// POST a new image url
router.post('/', createImageUrl)

// DELETE a new image url by id
router.delete('/:id', deleteImageUrl)

// UPDATE a new image url by id
router.patch('/:id', updateImageUrl)

module.exports = router
