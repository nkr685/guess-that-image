require('dotenv').config() // calls .env file 
const express = require('express')
const mongoose = require('mongoose')
const imageUrlRoutes = require('./routes/imageUrls.js')
const userRoutes = require('./routes/users.js')
const categoryRoutes = require('./routes/categories.js')

// starts express and uses json format
const app = express()
app.use(express.json())

//grabs all routes and attaches it to express
app.use('/api/ImageUrls', imageUrlRoutes)
app.use('/api/Users', userRoutes)
app.use('/api/Categories', categoryRoutes)

// connects to db with mongoose to enforce schema
mongoose.connect(process.env.MONGO_URI, {dbName: 'GuessThatImage'}) 
    .then(() => {
        app.listen(process.env.PORT, () => {  
        console.log('Connected to database and listening on port', process.env.PORT)
    })
    }) 
    .catch((error) => {
        console.log(error)
    })




