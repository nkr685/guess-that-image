const Category = require('../models/categoryModel.js')
const mongoose = require('mongoose')

// get all image urls
const getCategories = async (req, res, db) => {
    try {
        const categories = await Category.find({});
    
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({error: 'GETALL Cant find categories'});
      }
}

// get a single image url
const getCategory = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'GET invalid id'})
    }
    const category = await Category.findById(id)
    if (!category) {
        return res.status(404).json({error: "GET no such category"})
    }
    return res.status(200).json(category)
}

module.exports = {
    getCategories,
    getCategory
}