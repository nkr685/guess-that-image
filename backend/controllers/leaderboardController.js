const Leaderboard = require('../models/leaderboardModel.js')
const mongoose = require('mongoose')

// get leaderboard by dataset 
const getLeaderboards = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({});
    
        return res.status(200).json(leaderboard);
    } catch (error) {
        return res.status(500).json({error: 'GETALL Cant find category'});
      }
}

// get all leaderboards
const getLeaderboard = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'GET invalid id'})
    }
    const leaderboard = await Leaderboard.findById(id)
    if (!leaderboard) {
        return res.status(404).json({error: "GET no such leaderboard"})
    }
    return res.status(200).json(leaderboard)
}

// create a new leaderboard
const createLeaderboard = async (req, res) => {
    const leaderboardData  = req.body;
    const leaderboardId = new mongoose.Types.ObjectId();
    const leaderboardWithId = { ...leaderboardData, _id: leaderboardId };
    await Leaderboard.create(leaderboardWithId);
    res.status(201).json({ createdObjectId: leaderboardId }); // Return the created ObjectId in a JSON object
}


// update an leaderboard 
const updateLeaderboard = async (req, res) => {
    const leaderboardData = req.body
    const id = leaderboardData._id
    if (!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: 'UPDATE invalid id'})
    }
    const updatedLeaderboardData = await Leaderboard.findOneAndUpdate(
        { _id: id }, // finds by id
        { $set: leaderboardData }, // updates everything or jsut the field
        { new: true } // if returning, it returns updated 
    ).exec() // executes and returns 
    if (!updatedLeaderboardData) {
        res.status(404).json({error: "UPDATE no such leaderboard"})
    }
    res.status(200).json(updatedLeaderboardData)

}

module.exports = {
    getLeaderboards,
    getLeaderboard,
    createLeaderboard,
    updateLeaderboard
}