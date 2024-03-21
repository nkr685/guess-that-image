const Image = require('../models/imageModel.js')
const mongoose = require('mongoose')

// get all image urls
const getImages = async (req, res) => {
    try {
        const quizID = req.query.quizID
        console.log(quizID)
        if (!quizID) {
            return res.status(400).json({ error: 'Invalid or missing quizID parameter' });
        }
        const images = await Image.find({ quizReferenceID : quizID });

        res.status(200).json(images);
    } catch (error) {
        console.error('Error getting images by ObjectIds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// create a new image url
const createImages = async (req, res) => {
    try {
        const imageData = req.body; 

        imageData.forEach(image => {
            image._id = new mongoose.Types.ObjectId()
        })

        const insertedImages = await Image.insertMany(imageData);
        const extractedObjectIds = insertedImages.map(image => image._id);

        res.status(201).json(extractedObjectIds);
    } catch (error) {
        console.error('Error creating image URLs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getImages,
    createImages
}