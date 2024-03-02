const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for image urls in db
const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    quiz: {
        type: Array,
        required: true
    }
}, {collection: 'Mapping'})

module.exports = mongoose.model('Category', categorySchema)