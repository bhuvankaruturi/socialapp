const {db} = require('../util/admin');

exports.getAllPosts = (request, response) => {
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
};

exports.createPost = (request, response) => {
    if (request.body.body.trim === "") {
        response.status(400).json({body: "Body must not be empty"});
    }

    let newPost = {
        body:  request.body.body,
        username: request.user.username,
        userImage: request.user.imageUrl,
        createdAt: new Date().toISOString(),
        likes: 0,
        commentCount: 0
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
};

// get a particular post
exports.getPost = (request, response) => {
    let postData = {};
    db.doc(`/posts/${request.params.postId}`).get()
    .then(doc => {
        if (!doc.exists) return response.status(404).json({error: "Post not found"});
        postData = doc.data();
        postData.postId = doc.id;
        return db.collection('comments')
        .orderBy('createdAt', 'desc')
        .where('postId', '==', doc.id).get();
    })
    .then(data => {
        postData.comments = [];
        data.forEach(doc => {
            let comment = doc.data();
            comment.commentId = doc.id;
            postData.comments.push(comment);
        })
        return response.status(200).json(postData);
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    });
};

// deleta a post
exports.deletePost = (request, response) => {
    db
    .doc(`/posts/${request.params.postId}`)
    .get()
    .then(doc => {
        if (!doc.exists) return response.status(404).json({error: 'Post not found'});
        else if (doc.data().username !== request.user.username) return response.status(401).json({error: 'Unauthorized action'});
        else {
            db
            .doc(`/posts/${request.params.postId}`)
            .delete()
            .then(() => {
                return response.status(200).json({message: "Post has been deleted"});
            })
            .catch(error => {
                console.error(error);
                return response.status(500).json({error: error.code});
            });
        }
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    })
}

// function to like a post
exports.likePost = (request, response) => {
    let likes  = 1;
    let likeId;
    db
    .collection('likes')
    .where('username', '==', request.user.username)
    .where('postId', '==', request.params.postId)
    .limit(1)
    .get()
    .then(querySnapshot => {
        if (!querySnapshot.empty) return response.status(400).json({error: "Post already liked"});
        else {
            let like = {
                username: request.user.username,
                postId: request.params.postId
            }
            return db
            .collection('likes')
            .add(like)
            .then((doc) => {
                likeId = doc.id;
                return db.doc(`/posts/${request.params.postId}`).get();
            })
            .then(doc => {
                if (doc.exists) {
                    if (doc.data().likes) likes = doc.data().likes + 1;
                    return db
                    .doc(`/posts/${request.params.postId}`)
                    .update({likes})
                    .then(() => {
                        return response.status(200).json({message: 'liked the post'});
                    })
                    .catch(error => {
                        console.error(error);
                        return response.status(500).json({error: error.code});
                    });
                } else {
                    return db
                    .doc(`/likes/${likedId}`)
                    .delete()
                    .then(() => {
                        return response.status(404).json({error: "Post not found"});
                    })
                    .catch(error => {
                        console.error(error);
                        return response.status(500).json({error: "Something went wrong. Try again"});
                    });
                }
            });
        }
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    });
};

// function to unlike a post
exports.unlikePost = (request, response) => {
    let likes;
    db
    .collection('likes')
    .where('username', '==', request.user.username)
    .where('postId', '==', request.params.postId)
    .limit(1)
    .get()
    .then(querySnapshot => {
        if (querySnapshot.empty) return response.status(404).json({error: "Post not liked"});
        else {
            let doc = querySnapshot.docs[0];
            return db
                .doc(`/likes/${doc.id}`)
                .delete()  
                .then(() => {
                    console.log("this is execured");
                    return db.doc(`/posts/${request.params.postId}`).get();
                })
                .then(doc => {
                    if (!doc.exists) return response.status(404).json({error: "Post not found"});
                    else {
                        likes = doc.data().likes - 1;
                        if (likes < 0) likes = 0;
                        return db
                            .doc(`/posts/${request.params.postId}`)
                            .update({likes})
                            .then(() => {
                                return response.status(200).json({message: "Unliked the post"});
                            })
                            .catch(error => {
                                console.error(error);
                                return response.status(500).json({error: error.code});
                            });
                    }
                })
                .catch(error => {
                    console.error(error);
                    return response.status(500).json({error: error.code});
                });
        }   
    })  
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    });
};