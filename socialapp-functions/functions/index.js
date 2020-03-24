const functions = require('firebase-functions');
const cors = require('cors');
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
        getAuthenticatedUserData,
        getUserProfile,
        markNotificationsAsRead} = require('./handlers/users');
const {createComment, deleteComment} = require('./handlers/comments');
const {db} = require('./util/admin');
const firebaseAuth = require('./util/firebaseAuth');
const express = require('express');
const app = express();
app.use(cors());

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

// mark viewed notifications as read
app.post('/notifications', firebaseAuth, markNotificationsAsRead);

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
// view a user profile
app.get("/user/:username", getUserProfile);

// api endpoint for express app
exports.api = functions.https.onRequest(app);

// firestore database trigger to send notifications
// Notification when someone likes a post
exports.createNotificationOnLike = functions
    .firestore
    .document('likes/{id}')
    .onCreate((snapshot) => {
        return db
        .doc(`/posts/${snapshot.data().postId}`)
        .get()
        .then((doc) => {
            if (doc.data().username === snapshot.data().username) return;
            if (doc.exists) {
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
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
        return db
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
        return db
        .doc(`/posts/${snapshot.data().postId}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                if (doc.data().username === snapshot.data().username) return;
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
        return db
        .doc(`/notifications/${snapshot.id}`)
        .delete()
        .then(() => {return;})
        .catch(error => {
            console.error(error);
            return;
        });
    });

// change stored user image in a post when user uploads a new image
exports.updateOnUserImageChange = functions
    .firestore
    .document('users/{id}')
    .onUpdate(change => {
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            const batch = db.batch();
            return db
                .collection('posts')
                .where('username', '==', change.before.id)
                .get()
                .then(data => {
                    data.forEach(doc => {
                        batch.update(doc.ref, {userImage: change.after.data().imageUrl});
                    });
                    return db
                        .collection('comments')
                        .where('username', '==', change.before.id)
                        .get();
                })
                .then(data => {
                    data.forEach(doc => {
                        batch.update(doc.ref, {userImage: change.after.data().imageUrl});
                    });
                    return batch.commit();
                })
                .then(() => {
                    return true;
                })
                .catch(error => {
                    console.error(error);
                    return false;
                });
        }
        // return some value to avoid error
        return true;
    });

exports.onPostDelete = functions
    .firestore
    .document('posts/{id}')
    .onDelete((snapshot, context) => {
        const batch = db.batch();
        return db
        .collection('comments')
        .where('postId', '==', snapshot.id)
        .get()
        .then(data => {
            data.forEach(doc => {
                batch.delete(doc.ref);
            })
            return db
                .collection('likes')
                .where('postId', '==', snapshot.id)
                .get();
        })
        .then(data => {
            data.forEach(doc => {
                batch.delete(doc.ref);
            });
            return db
            .collection('notifications')
            .where('postId', '==', snapshot.id)
            .get();
        })
        .then(data => {
            data.forEach(doc => {
                batch.delete(doc.ref);
            });
            return batch.commit();
        })
        .then(() => {return true;})
        .catch(error => {
            console.error(error);
            return false;
        });
    });