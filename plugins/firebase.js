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

async function addAllPosts(payload) {
    // Init new Firebase batch
    let batch = db.batch()

    // Write new batch entry for each post
    payload.forEach((post) => {
        let tempRef = db.collection('posts').doc(post.id)
        batch.set(tempRef, {
            id: post.id,
            name: post.name,
            likes: 0
        })
    })

    return batch.commit()
}

async function likePost(payload) {
    
    let tempRef = db.collection('posts').doc(payload)

    // let result = tempRef.update({ likes: 5 })

    let transaction = db.runTransaction(t => {
        return t.get(tempRef)
            .then(doc => {
                let newLikeCount = doc.data().likes + 1
                t.update(tempRef, { likes: newLikeCount })
            })
            .then(result => {
                return "Transaction successful"
            })
            .catch(err => {
                console.error(err)
                return err
            })
    })

    return transaction
}

// Export modules
module.exports = {
    getAllData,
    addAllPosts,
    likePost
}