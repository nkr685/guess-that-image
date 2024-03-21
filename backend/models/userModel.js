const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // uses salt to add random string to your password then hashes after, useful if multi users have same password
const validator = require('validator') // does all the regex validation for us for signup/login


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
    },
    profilePic: {
        type: String,
        required: false
    },
    accountCreationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    bio: {
        type: String,
        required: false
    },
    achievements: {
        type: Array,
        required: false
    },
    following: {
        type: Array,
        required: false
    },
    quizzesCreated:{
        type: Array,
        required: false
    },
    totalPlays: {
        type: Number,
        required: false
    },
    quizzesPlayed: {
        type: Array,
        required: false
    }, // best score, best time
    recentActivity:{
        type: Array,
        required: false
    },
    bookmarks:{
        type: Array,
        required: false
    }, // date bookmarked
    likes: {
        type: Array,
        required: false
    }, // date liked
    comments: {
        type: Array,
        required: false
    },
    friends: {
        type: Array,
        required: false
    }
}, {collection: 'Users'})


// mongoose comes with methods for user auth
// static signup method
UserSchema.statics.signup = async function(username, password) { // cant use arrow function since we using this other wise it wont work
    // unique is schema is extra layer of security, better to check here anyways
    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    // if(!validator.isEmail(username)){ // use if we want email
    //     throw Error("Email is not valid")
    // }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ username }) // use statics to be able to use this

    if (exists) {
        throw Error('Username already in use!')
    }

    const salt = await bcrypt.genSalt(10) // takes time to create salt, longer makes harder for hacker, takes longer to signup
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash }) // creates document for database

    return user
}

UserSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username }) // use statics to be able to use this

    if (!user) {
        throw Error('No username found')
    }

    const match = await bcrypt.compare(password, user.password) // compares passwords for us
    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}
module.exports = mongoose.model('User', UserSchema)
