const ImageUrl = require('../models/imageUrlModel.js')
const mongoose = require('mongoose')

// get all image urls
const getImageUrls = async (req, res, db) => {
    try {
        const { category } = req.query;
        const imageUrls = await ImageUrl.find({category});
    
        res.status(200).json(imageUrls);
    } catch (error) {
        res.status(500).json({error: 'GETALL Cant find category'});
      }
}

// get a single image url
const getImageUrl = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'GET invalid id'})
    }
    const imageUrl = await ImageUrl.findById(id)
    if (!imageUrl) {
        return res.status(404).json({error: "GET no such image"})
    }
    return res.status(200).json(imageUrl)
}

// create a new image url
const createImageUrl = async (req, res) => {
    const {id, category, url, name} = req.body
    const imageUrl = await ImageUrl.create({id, category, url, name})
    if (!imageUrl) {
        return res.status(404).json({error: "CREATE no such image"})
    }
    return res.status(200).json(imageUrl)
}

// delete an image url
const deleteImageUrl = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'DELETE invalid id'})
    }
    const imageUrl = await ImageUrl.findOneAndDelete({_id: id})
    if (!imageUrl) {
        return res.status(404).json({error: "DELETE no such image"}) 
    }
    res.status(200).json(imageUrl)
}
// update an image url
const updateImageUrl = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'UPDATE invalid id'})
    }
    const imageUrl = await ImageUrl.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!imageUrl) {
        return res.status(404).json({error: "UPDATE no such image"})
    }
    res.status(200).json(imageUrl)

}

module.exports = {
    getImageUrls,
    getImageUrl,
    createImageUrl,
    deleteImageUrl,
    updateImageUrl
}