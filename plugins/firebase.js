const firebase = require('firebase/app')
require('firebase/firestore')

// Init firebase
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.PROJECT_ID,
    databaseURL: process.env.DATABASE_URL
})

const db = firebase.firestore()

db.settings({
    timestampsInSnapshots: true
})

async function getAllData() {
    // Define DB reference
    const toolsSnapshot = await db.collection('posts').get()
    const tools = []
    
    toolsSnapshot.forEach((doc) => {
        tools.push({
            id: doc.id,
            data: doc.data()
        })
    })

    // Return data back to function
    return tools
}

// Export modules
module.exports = {
    getAllData
}