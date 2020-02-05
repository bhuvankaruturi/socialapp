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
const {createComment, deleteComment} = require('./handlers/comments');
const {db} = require('./util/admin');
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
// delete a comment on a post
app.delete('/post/:postId/comment/:commentId', firebaseAuth, deleteComment);
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
// Notification when someone likes a post
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

// Delete the notification when someone unlikes a post
exports.deleteNotificationOnUnlike = functions
    .firestore
    .document('/likes/{id}')
    .onDelete((snapshot) => {
        db
        .doc(`/notifications/${snapshot.id}`)
        .delete()
        .then(() => {
            return;
        })
        .catch(error => {
            console.error(error);
            return;
        });
    });

// Notification when someone comments on a post
exports.createNotificationOnComment = functions
    .firestore
    .document('comments/{id}')
    .onCreate((snapshot) => {
        db
        .doc(`/posts/${snapshot.data().postId}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().username,
                    sender: snapshot.data().username,
                    type: 'comment',
                    read: false,
                    postId: doc.id
                });
            }
        })
        .then(() =>  {return;})
        .catch(error => {
            console.error(error);
            return;
        });
    });

// Notification when someone deletes a comment
exports.deleteNotificationOnUncomment = functions
    .firestore
    .document('comments/{id}')
    .onDelete(snapshot => {
        db
        .doc(`/notifications/${snapshot.id}`)
        .delete()
        .then(() => {return;})
        .catch(error => {
            console.error(error);
            return;
        });
    });