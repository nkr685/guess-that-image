const express = require('express')

const {
    getCategories,
    getCategory
} = require('../controllers/categoryController.js')

const router = express.Router()

// GET all image urls
router.get('/', getCategories) 

// GET a single image url by id
router.get('/:id', getCategory)

module.exports = router
