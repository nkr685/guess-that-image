const User = require('../models/userModel.js')
const mongoose = require('mongoose')

// get all user urls
const loginUser = async (req, res, user) => {
    res.json({mssg: "login user"})
}

const signUpUser = async (req, res, user) => {
    res.json({mssg: "signup user"})
}


module.exports = {
    loginUser,
    signUpUser
}