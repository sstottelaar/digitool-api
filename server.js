require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
let cache = require('memory-cache')
const routes = require('./routes')

// Initialize middleware
app.use(morgan('common'))
app.use(cors())
app.use(bodyParser.json())

// Initialize routes
app.use('/api', routes)

// DEV ONLY - DANGER ZONE
// app.get('/api/dev/init', (req, res) => {
//     dataProcessor.initAllPosts()
//     .then((data) => {
//         res.send(data)
//     })
// })

// Catch all 404
app.get('/*', (req, res) => {
    res.status(404).json('Hoo there! You look lost!')
})

// Initiate server
app.listen(process.env.PORT, () => console.log("Server is running on port", process.env.PORT))