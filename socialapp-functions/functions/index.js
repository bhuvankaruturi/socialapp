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

const db = admin.firestore();

// get posts
app.get('/posts', (request, response) => {
    db
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
        username: request.body.username,
        createdAt: new Date().toISOString()
    };

    db
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

const isValidEmail = (email) => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email.toLowerCase());
}

const isEmpty = (s) => {
    return s.trim() == '';
}

// user signup
app.post('/signup', (request, response) => {
    let newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        username: request.body.username
    };

    // user details validation

    let errors = {};

    if (isEmpty(newUser.email)) {
        errors.email = 'Must not be empty';
    } else if (isValidEmail(newUser.email)) {
        errors.email = 'Must be a valid email address';
    }

    if (isEmpty(newUser.password)) {
        errors.password = 'Must not be empty';
    } else if (newUser.password !== newUser.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    if (isEmpty(newUser.username)) {
        errors.username = 'Must not be empty'
    }

    let userId, token;
    db
    .doc(`/users/${newUser.username}`)
    .get()
    .then(documentSnapshot => {
        if (documentSnapshot.exists)  {
            return response
                        .status(400)
                        .json({username: `username ${newUser.username} already exists`});
        } else {
            return firebase
                        .auth()
                        .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        let userCredentials = {
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        }
        return db
                .doc(`/users/${newUser.username}`)
                .set(userCredentials);
    })
    .then(() => {
        return response.status(201).json({token});
    })
    .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            return response.status(400).json({email: 'email already in use'});
        } else {
            console.error(error);
            return response.status(500).json({error: error.code});
        }
    })
});

// api endpoint for express app
exports.api = functions.https.onRequest(app);