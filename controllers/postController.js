let cache = require('memory-cache')
const dataProcessor = require('../plugins/data-processor')
const firebase = require('../plugins/firebase')
const kenticoCloud = require('../plugins/kentico-cloud')

module.exports = {
    getAllPosts: (req, res) => {
        if(!cache.get('cachedData')) {
            dataProcessor.getAllPosts()
                .then((data) => {
                    cache.put('cachedData', data, 600000)
                    res.send(data)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        } else {
            res.send(cache.get('cachedData'))
        }
    },
    likePost: (req, res) => {
        firebase.likePost(req.params.id)
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
    },
    getSinglePost: (req, res) => {
        kenticoCloud.getSinglePost(req.params.id)
            .then((result) => {
                res.json(result)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    },
    addPost: (req, res) => {
        const data = req.body
        firebase.addPost(data)
            .then((result) => {
                res.send(result)
            })
            .catch((error) => {
                // Send 200 even if these is an error,prevents KC from overloading
                res.status(200).send(error)
            })
    }
}