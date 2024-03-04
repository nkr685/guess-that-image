const express = require('express')

const {
    getLeaderboards,
    getLeaderboard,
    createLeaderboard,
    deleteLeaderboard,
    updateLeaderboard
} = require('../controllers/leaderboardController.js')

const router = express.Router()

// GET all leaderboards
router.get('/', getLeaderboards) 

// GET a single leaderboard by id
router.get('/:id', getLeaderboard)

// POST a new leaderboard
router.post('/', createLeaderboard)

// DELETE a new leaderboard by id
router.delete('/:id', deleteLeaderboard)

// UPDATE a new leaderboard by id
router.patch('/:id', updateLeaderboard)

module.exports = router
