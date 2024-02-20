const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for image urls in db
const imageUrlSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ImageUrl', imageUrlSchema)
