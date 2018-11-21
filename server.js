const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

// Require plugins
const { db, getAllPostData } = require('./plugins/firebase')
morgan('tiny')

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.get('/api/tools', (req, res) => {
    res.send('Test')

    getAllPostData()
    .then((data) => {
        console.log(data)
    })
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running"))