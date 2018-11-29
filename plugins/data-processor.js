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
            if(post.system.codename == entry.codename) {
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

async function initAllPosts() {
    // Init kentico
    const kenticoCloudData = await kenticoCloud.getAllData()

    tempPosts = []

    // Create new entry for each post
    kenticoCloudData.forEach((post) => {
        tempPosts.push({
            id: post.system.id,
            name: post.system.name,
            codename: post.system.codename
        })
    })

    // Perform write on firebase
    firebase.addAllPosts(tempPosts)
        .then(() => {
            return "Data has been added"
        })
        .catch((err) => {
            throw err
        })

    // Return result
    return tempPosts
}

module.exports = {
    getAllPosts,
    getAllCategories,
    initAllPosts
}