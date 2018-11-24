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
        throw {
            status: 500,
            errorMessage: "No data available"
        }
    }    
}

module.exports = {
    getAllData
}