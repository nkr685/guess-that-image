const mongoose = require('mongoose') 
const Schema = mongoose.Schema

// schema for user documents in db
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'Users'})

module.exports = mongoose.model('User', UserSchema)
