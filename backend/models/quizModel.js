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
    }
}, {collection: 'Quizzes'})

module.exports = mongoose.model('Quiz', quizSchema)
