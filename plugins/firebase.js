const firebase = require('firebase/app')
require('firebase/firestore')

// Init firebase
firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.PROJECT_ID,
})

const db = firebase.firestore()

db.settings({
    timestampsInSnapshots: true
})

async function getAllPostData() {

    const toolsSnapshot = await db.collection('tools').get()
    const tools = []

    toolsSnapshot.forEach((doc) => {
        tools.push({
            id: doc.id,
            data: doc.data()
        })
    })

    return tools
}

// Export modules
module.exports = {
    db,
    getAllPostData
}