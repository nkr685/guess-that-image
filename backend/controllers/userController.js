const User = require('../models/userModel.js')
const mongoose = require('mongoose')

// get all user urls
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
    
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({error: 'GETALL Cant find users'});
      }
}

// get a single user url
const getUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'GET user invalid id'})
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({error: "GET no such user"})
    }
    return res.status(200).json(user)
}

// create a new user url
const createUser = async (req, res) => {
    const {name, username} = req.body
    try {
        const user = await User.create({name, username}) 
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

// delete an user url
const deleteUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'DELETE invalid id'})
    }
    const user = await User.findOneAndDelete({_id: id})
    if (!user) {
        return res.status(404).json({error: "DELETE no such user"}) 
    }
    res.status(200).json(user)
}
// update an user url
const updateUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'UPDATE invalid id'})
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({error: "UPDATE no such user"})
    }
    res.status(200).json(user)

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}