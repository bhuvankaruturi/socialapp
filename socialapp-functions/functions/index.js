const functions = require('firebase-functions');
const {admin, db} = require('./util/admin');
const {getAllPosts, createPost} = require('./handlers/posts');
const {signup, login} = require('./handlers/users');
const firebaseAuth = require('./util/firebaseAuth');
const express = require('express');
const app = express();

// get posts
app.get('/posts', getAllPosts);

// create post
app.post('/post', firebaseAuth, createPost);

// user signup
app.post('/signup', signup);

// login route
app.post("/login", login);

// api endpoint for express app
exports.api = functions.https.onRequest(app);