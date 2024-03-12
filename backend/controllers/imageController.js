const Image = require('../models/imageModel.js')
const mongoose = require('mongoose')

// get all image urls
const getImages = async (req, res) => {
    try {
        const imageIds = req.query.imageIDs.split(',');
        if (!imageIds || !Array.isArray(imageIds)) {
            return res.status(400).json({ error: 'Invalid or missing imageIDs parameter' });
        }
        const objectIdArray = imageIds.map(id => mongoose.Types.ObjectId.createFromHexString(id));
        const images = await Image.find({ _id: { $in: objectIdArray } });

        res.status(200).json(images);
    } catch (error) {
        console.error('Error getting images by ObjectIds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// create a new image url
const createImages = async (req, res) => {
    try {
        const images = req.body; 

        const updatedIDImages = images.map(image => ({
            _id: new mongoose.Types.ObjectId(), // Generate ObjectId
            imageUrl: image.imageUrl,
            imageName: image.imageName
        }));

        const insertedImages = await Image.insertMany(updatedIDImages);
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