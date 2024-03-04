const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for in db
const leaderboardSchema = new Schema({
    dataset: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    scores: {
        type: Array,
        required: true
    }
}, {collection: 'Leaderboard'})

module.exports = mongoose.model('Leaderboard', leaderboardSchema)