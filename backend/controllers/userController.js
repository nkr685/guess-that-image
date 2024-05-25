const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const createToken = (_id) => { // created a function so it can be used by both login and signup
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'}) // payload, dont put anything sensitive in here, uses secret code from .env, login token lasts 3 days
}

// get all user urls
const loginUser = async (req, res) => {
    const { username, password } = req.body

    try { 
        const user = await User.login(username, password)
        if (user.deleted) {
            return res.status(400).json({error: "Account Permanently Deleted"})
        }
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

const getUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'GET invalid id'})
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({error: "GET no such user"})
    }
    user.password = ""
    return res.status(200).json(user)
}

const getUsers = async (req, res) => {
    const {userIDs} = req.params
    console.log(userIDs)

    const idsArray = userIDs.split(',')

    const users = []

    for (const id of idsArray) {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'GET invalid id'})
        }
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({error: "GET no such user"})
        }
        user.password = ""        
        users.push(user)
    }

    return res.status(200).json(users)
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'GET invalid id'})
    }
    const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: {"deleted": true} }, 
        { new: true } 
    ).exec() 
    console.log(user)
    if (!user) {
        return res.status(404).json({error: "GET no such author"})
    }
    user.password = ""
    return res.status(200).json({message: "User successfully delete"})
}

const updateUser = async (req, res) => {
    const userData = req.body
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid User Id'})
    }
    const updatedUserData = await User.findOneAndUpdate(
        { _id: id },
        { $set: userData }, 
        { new: true } 
    ).exec() 
    if (!updatedUserData) {
        return res.status(404).json({error: "No such User"})
    }
    updatedUserData["password"] = ""
    return res.status(200).json(updatedUserData)
}

module.exports = {
    loginUser,
    signUpUser,
    getUser,
    deleteUser,
    updateUser,
    getUsers
}