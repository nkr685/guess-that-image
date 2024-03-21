const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for image urls in db
const quizSchema = new Schema({
    quizName: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    leaderboardID: {
        type: String,
        required: true
    },
    imageIDs: {
        type: Array,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    categoryIDs: {
        type: Array,
        required: false
    },
    tags:{
        type: Array,
        required: false
    },
    ratings: {
        type: Array,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    plays: {
        type: Number,
        required: false
    },
    comments: {
        type: Number,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: false
    }
}, {collection: 'Quizzes'})

module.exports = mongoose.model('Quiz', quizSchema)
