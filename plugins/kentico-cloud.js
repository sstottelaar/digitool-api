const kenticoCloud = require('kentico-cloud-delivery')

// Init new Kentico Cloud client
const deliveryClient = new kenticoCloud.DeliveryClient({
    projectId: process.env.KENTICO_CLOUD_PROJECT_ID
})

async function getAllData() {
    // Define KC query
    const postSnapshot = await deliveryClient.items().type('post').orderParameter('system.last_modified', kenticoCloud.SortOrder.desc).getPromise()

    if(postSnapshot.items.length > 0) {        
        // Give data back to caller
        return postSnapshot.items
    } else {
        console.log(postSnapshot)
        throw {
            status: 500,
            errorMessage: "No data available"
        }
    }    
}

// Get single post from KC
// TODO: add error handling when no post is found
async function getSinglePost(post) {
    if(post.length > 0) {
        const postSnapshot = await deliveryClient
            .item(post)
            .elementsParameter(['name', 'website_url', 'screenshot', 'article_about_tool', 'rating', 'short_description'])
            .getPromise()

        return postSnapshot.item
    } else {
        throw {
            status: 500,
            errorMessage: "No post given"
        }
    }
}

module.exports = {
    getAllData,
    getSinglePost
}