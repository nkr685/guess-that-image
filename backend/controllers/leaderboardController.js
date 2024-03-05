const Leaderboard = require('../models/leaderboardModel.js')
const mongoose = require('mongoose')

// get leaderboard by dataset 
const getLeaderboards = async (req, res, db) => {
    try {
        const leaderboard = await Leaderboard.find({});
    
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({error: 'GETALL Cant find category'});
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
    const {id, dataset, name, score} = req.body
    const leaderboard = await Leaderboard.create({id, dataset, name, score})
    if (!leaderboard) {
        return res.status(404).json({error: "CREATE no such leaderboard"})
    }
    return res.status(200).json(leaderboard)
}

// delete an leaderboard 
const deleteLeaderboard = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'DELETE invalid id'})
    }
    const leaderboard = await Leaderboard.findOneAndDelete({_id: id})
    if (!leaderboard) {
        return res.status(404).json({error: "DELETE no such leaderboard"}) 
    }
    res.status(200).json(leaderboard)
}
// update an leaderboard 
const updateLeaderboard = async (req, res) => {
    const {id} = req.params
    const leaderboard = req.body
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'UPDATE invalid id'})
    }
    const updatedLeaderboard = await Leaderboard.findOneAndUpdate(
        { _id: id },
        { $set: { scores: leaderboard.scores} },
        { new: true } 
    ).exec()
    if (!updatedLeaderboard) {
        return res.status(404).json({error: "UPDATE no such leaderboard"})
    }
    res.status(200).json(updatedLeaderboard)

}

module.exports = {
    getLeaderboards,
    getLeaderboard,
    createLeaderboard,
    deleteLeaderboard,
    updateLeaderboard
}