const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for in db
const scoreSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, { _id: false })

const leaderboardSchema = new Schema({
    quizName: {
        type: String,
        required: true
    },
    scores: {
        type: [scoreSchema],
        required: true
    }
}, {collection: 'Leaderboards'})

module.exports = mongoose.model('Leaderboard', leaderboardSchema)