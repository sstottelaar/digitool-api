let cache = require('memory-cache')
const dataProcessor = require('../plugins/data-processor')

module.exports = {
    getAllCategories: (req, res) => {
        if(!cache.get('cachedCategories')) {
            dataProcessor.getAllCategories()
                .then((data) => {
                    cache.put('cachedCategories', data, 600000)
                    res.send(data)
                })
                .catch((err) => {
                    res.status(500).json(err)
                })
        } else {
            res.send(cache.get('cachedCategories'))
        }
    }
}