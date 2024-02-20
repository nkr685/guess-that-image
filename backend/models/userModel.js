const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for user documents in db
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', UserSchema)
