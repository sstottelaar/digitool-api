let express = require('express')
let postController = require('./controllers/postController')
let categoryController = require('./controllers/categoryController')

let router = express.Router()

// Routes for post
router.route('/tools').get(postController.getAllPosts)
router.route('/tools/:id/like').put(postController.likePost)
router.route('/tools/:id').get(postController.getSinglePost)
router.route('/tools').post(postController.addPost)

// Routes for categories
router.route('/categories').get(categoryController.getAllCategories)

module.exports = router