const firebase = require('./firebase')
const kenticoCloud = require('./kentico-cloud')

async function getAllPosts() {
    // Init all services
    const firebaseData = await firebase.getAllData()
    const kenticoCloudData = await kenticoCloud.getAllData()
    
    // Create temp data
    const processedData = []
    
    // Loop all posts from KC and match likes
    kenticoCloudData.forEach((post) => {
        post.likes = {}
        firebaseData.forEach((entry) => {
            if(post.system.id == entry.data.id) {
                post.likes.count = entry.data.likes
            }
        })

        // Push post back to temp array
        processedData.push(post)
    })

    // Send data back to caller
    return processedData
}

async function getAllCategories() {
    // Init service
    const kenticoCloudData = await kenticoCloud.getAllData()

    // Define temp array
    tempCategories = []

    // Extract all categories
    kenticoCloudData.forEach((entry) => {
        tempCategories.push(entry.category.value[0])
    })

    // Return unique items in array
    return [...new Set(tempCategories.map(item => item.name))]
}

module.exports = {
    getAllPosts,
    getAllCategories
}