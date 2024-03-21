const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

const createToken = (_id) => { // created a function so it can be used by both login and signup
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'}) // payload, dont put anything sensitive in here, uses secret code from .env, login token lasts 3 days
}

// get all user urls
const loginUser = async (req, res) => {
    const { username, password } = req.body

    try { 
        const user = await User.login(username, password)

        const userID = user._id
        const token = createToken(userID)
        user.token = token
        user.password = ""
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message}) // catches error we created or any other error by mongoose
    }
}

const signUpUser = async (req, res) => {
    const {username, password} = req.body

    try { // need this to catch the throw we created in signup model
        const user = await User.signup(username, password)

        // create a token
        const userID = user._id
        const token = createToken(userID)
        
        user.token = token
        user.password = ""
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message}) // catches error we created or any other error by mongoose
    }
}


module.exports = {
    loginUser,
    signUpUser
}