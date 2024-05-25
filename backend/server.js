require('dotenv').config() // calls .env file 
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const categoryRoutes = require('./routes/categoryRoutes.js')
const quizRoutes = require('./routes/quizRoutes.js')
const imageRoutes = require('./routes/imageRoutes.js')
const leaderboardRoutes = require('./routes/leaderboardRoutes.js')
const userRoutes = require('./routes/userRoutes.js')
const uploadRoutes = require('./routes/uploadRoutes.js')

// starts express and uses json format
const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' })) // fixes large payload error

//grabs all routes and attaches it to express
app.use('/api/Categories', categoryRoutes)
app.use('/api/Quizzes', quizRoutes)
app.use('/api/Images', imageRoutes)
app.use('/api/Leaderboards', leaderboardRoutes)
app.use('/api/Users', userRoutes)
app.use('/api/Upload', uploadRoutes)

// connects to db with mongoose to enforce schema
mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DBNAME}) 
    .then(() => {
        app.listen(process.env.PORT, () => {  
        console.log('Connected to database and listening on port', process.env.PORT)
    })
    }) 
    .catch((error) => {
        console.log(error)
    })




