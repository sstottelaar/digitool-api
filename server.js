const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

// Require plugins
const firebase = require('./plugins/firebase')
const kenticoCloud = require('./plugins/kentico-cloud')
const dataProcessor = require('./plugins/data-processor')
morgan('tiny')
app.use(cors())

// Returns all processed API data
app.get('/api/tools', (req, res) => {
    dataProcessor.getAllPosts()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
        res.status(500).json(err)
    })
})

// Return all categories
app.get('/api/tools/categories/', (req, res) => {
    dataProcessor.getAllCategories()
    .then((data) => {
        console.log(data)
        res.send(data)
    })
})

// Like a post
app.get('/api/tools/:id/like', (req, res) => {
    firebase.likePost(req.params.id)
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

// DEV ONLY
// app.get('/api/tools/init', (req, res) => {
//     dataProcessor.initAllPosts()
//     .then((data) => {
//         res.send(data)
//     })
// })

// DEV ONLY
app.get('/api/tools/firebase', (req, res) => {    
    firebase.getAllData()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
        res.status(500)
        res.send('An error occurred')
    })    
})

// DEV ONLY
app.get('/api/tools/kentico', (req, res) => {    
    kenticoCloud.getAllData()
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.error(err)
        res.status(500).json(err)
    })
})

// Catch all
app.get('/*', (req, res) => {
    res.status(404).json('You look lost!')
})

// Setup server
app.listen(process.env.PORT, () => console.log("Server is running on port", process.env.PORT))