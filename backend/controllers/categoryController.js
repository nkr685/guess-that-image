const Category = require('../models/categoryModel.js')
const mongoose = require('mongoose')

// get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
    
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({error: 'GETALL Cant find categories'});
      }
}

// create a new category
const createCategory = async (req, res) => {
    const categoryData  = req.body;
    delete categoryData._id
    await Category.create(categoryData);
    res.status(201).json(); // Return the created ObjectId in a JSON object
}

// update an existing category
const updateCategory = async (req, res) => {
    try {
        const { _id, quizIDs } = req.body; // category name is included but will never change
        const updatedCategory = await Category.findOneAndUpdate(
            { _id }, // searches by id
            { quizIDs: quizIDs},
            { new: true } // returns updated doc
        )
            
        // checks if updated
        if (!updatedCategory) {
            res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory
}