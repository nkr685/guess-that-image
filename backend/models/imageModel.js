const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for image urls in db
const imageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    }
}, {collection: 'Images'})

module.exports = mongoose.model('Image', imageSchema)
