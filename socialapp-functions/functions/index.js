const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require('./socialapp-5380a-firebase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-5380a.firebaseio.com"
});

const express = require('express');
const app = express();

const firebase = require('firebase');
let firebaseConfig = {
    apiKey: "AIzaSyCNTLnPuN3e9kdHlFApSBeMlBb-BDyz0fI",
    authDomain: "socialapp-5380a.firebaseapp.com",
    databaseURL: "https://socialapp-5380a.firebaseio.com",
    projectId: "socialapp-5380a",
    storageBucket: "socialapp-5380a.appspot.com",
    messagingSenderId: "928558151070",
    appId: "1:928558151070:web:25a90a306e1f650edf528f",
    measurementId: "G-JTTGB8T8P0"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// get posts
app.get('/posts', (request, response) => {
    admin.firestore()
    .collection("posts")
    .orderBy('createdAt', 'desc')
    .get().then((querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({
                postId: doc.id,
                ...doc.data()
            });
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
        createdAt: new Date().toISOString()
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

// user signup
app.post('/signup', (request, response) => {
    let newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        userHandle: request.body.userHandle
    };

    //TODO : user details validation

    firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
        return response
                .status(201)
                .json({message: `user {data.user.uid} has been successfully created`});
    })
    .catch((error) => {
        return response
                .status(500)
                .json({error: error.code});
    });
});

// api endpoint for express app
exports.api = functions.https.onRequest(app);