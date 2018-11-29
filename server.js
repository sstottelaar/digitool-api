const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

// Require plugins
const firebase = require('./plugins/firebase')
const kenticoCloud = require('./plugins/kentico-cloud')
const dataProcessor = require('./plugins/data-processor')
morgan('tiny')
app.use(cors())
app.use(bodyParser.json())

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
app.get('/api/categories', (req, res) => {
    dataProcessor.getAllCategories()
    .then((data) => {
        console.log(data)
        res.send(data)
    })
})

// Like a post
app.put('/api/tools/:id/like', (req, res) => {
    firebase.likePost(req.params.id)
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})

// Get single post
app.get('/api/tools/:id', (req, res) => {
    kenticoCloud.getSinglePost(req.params.id)
    .then((result) => {
        console.log(result)
        res.json(result)
    })
})

// Add new post
app.post('/api/tools', (req, res) => {
    const data = req.body

    firebase.addPost(data)
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(500).send(error)
        })

    console.log(req.body.message)
})

// DEV ONLY
// app.get('/api/dev/init', (req, res) => {
//     dataProcessor.initAllPosts()
//     .then((data) => {
//         res.send(data)
//     })
// })

// DEV ONLY
app.get('/api/dev/firebase', (req, res) => {    
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
app.get('/api/dev/kentico', (req, res) => {
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