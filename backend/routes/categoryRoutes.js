const express = require('express')

const {
    getCategories,
    updateCategory,
    createCategory
} = require('../controllers/categoryController.js')

const router = express.Router()

// get all categories
router.get('/', getCategories) 

// create category
router.post('/', createCategory)

// update category by id
router.patch('/:id', updateCategory)

module.exports = router
