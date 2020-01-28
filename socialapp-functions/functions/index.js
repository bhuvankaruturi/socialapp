const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require('./socialapp-5380a-firebase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-5380a.firebaseio.com"
});

const express = require('express');
const app = express();

// get posts
app.get('/posts', (request, response) => {
    admin.firestore().collection("posts").get().then((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
            posts.push(doc.data());
        });
        return response.json(posts);
    }).catch((error) => console.error(error));
});

//create post
app.post('/post', (request, response) => {
    if (request.method !== 'POST') {
        return response.status(400).json({error : "Method not allowed"});
    }
    let newPost = {
        body:  request.body.body,
        userHandle: request.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
    .collection("posts")
    .add(newPost)
    .then((doc) => {
        response.json({message: `document ${doc.id} successfully created`});
    })
    .catch((error) => {
        response.status(500).json({error : 'something went wrong'});
        console.error(error);
    });
});

// api endpoint for express app
exports.api = functions.https.onRequest(app);