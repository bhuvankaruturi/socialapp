const functions = require('firebase-functions');
const {getAllPosts, 
        createPost, 
        getPost, 
        deletePost, 
        likePost, 
        unlikePost} = require('./handlers/posts');
const {signup, 
        login, 
        uploadImage, 
        addUserDetails, 
        getAuthenticatedUserData} = require('./handlers/users');
const {createComment} = require('./handlers/comments');
const firebaseAuth = require('./util/firebaseAuth');
const express = require('express');
const app = express();

// get posts
app.get('/posts', getAllPosts);
// create post
app.post('/post', firebaseAuth, createPost);
// get post details
app.get('/post/:postId', getPost);
// delete post
app.delete('/post/:postId', firebaseAuth, deletePost);
// create a comment on a post
app.post('/post/:postId/comment', firebaseAuth, createComment);
// like a post
app.post('/post/:postId/like', firebaseAuth, likePost);
// unlike a post
app.delete('/post/:postId/like', firebaseAuth, unlikePost);

// user signup
app.post('/signup', signup);
// login route
app.post("/login", login);
// user image upload route
app.post("/user/image", firebaseAuth, uploadImage)
// add user details
app.post("/user", firebaseAuth, addUserDetails)
// get logged in user details
app.get("/user", firebaseAuth, getAuthenticatedUserData);

// api endpoint for express app
exports.api = functions.https.onRequest(app);

// firestore database trigger to send notifications
exports.createNotificationOnLike = functions
    .firestore
    .document('likes/{id}')
    .onCreate((snapshot) => {
        db
        .doc(`/posts/${snapshot.data().postId}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createAt: new Date().toISOString(),
                    recipient: doc.data().username,
                    sender: snapshot.data().username,
                    type: 'like',
                    read: false,
                    postId: doc.id
                });
            }
        })
        .then(() => {return;})
        .catch((error) => {
            console.error(error);
            return;
        });
    });

exports.createNotificationOnComment = functions
    .firestore
    .document('comments/{id}')
    .onCreate((snapshot) => {
        db
        .doc(`/posts/${snapshot.data().postId}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                if (doc.exits) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().username,
                        sender: snapshot.data().username,
                        type: 'comment',
                        read: false,
                        postId: doc.id
                    });
                }
            }
        })
        .then(() =>  {return;})
        .catch(error => {
            console.error(error);
            return;
        });
    });