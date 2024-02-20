require('dotenv').config() // calls .env file 
const express = require('express')
const mongoose = require('mongoose')
const imageUrlRoutes = require('./routes/imageUrls.js')
const userRoutes = require('./routes/users.js')

// starts express and uses json format
const app = express()
app.use(express.json())

//grabs all routes and attaches it to express
app.use('/ImageUrls', imageUrlRoutes)
app.use('/Users', userRoutes) 


// connects to db with mongoose to enforce schema
mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        app.listen(process.env.PORT, () => {  
        console.log('Connected to DB and Listening on port', process.env.PORT)
    })
    }) 
    .catch((error) => {
        console.log(error)
    })




