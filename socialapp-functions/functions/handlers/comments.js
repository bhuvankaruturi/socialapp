const {db} = require('../util/admin');

// comment on a post
exports.createComment = (request, response) => {
    if (request.body.body.trim() === '') return reponse.status(400).json({error: "Invalid comment. Must not be empty"});
    let commentData = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        username: request.user.username,
        postId: request.params.postId,
        userImage: request.user.imageUrl,
    };
    let commentsCount = 0;
    let countUpdated = false;
    let commentCreated = false;
    let commentId  = "";
    db.doc(`/posts/${request.params.postId}`).get()
    .then(doc => {
        if (!doc.exists) return response.status(404).json({error: "Post not found"});
        if (doc.data().commentsCount) commentsCount = doc.data().commentsCount;
        return db
        .collection('comments')
        .add(commentData)
        .then(doc => {
            commentId = doc.id;
            commentCreated = true;
            commentsCount++;
            return db.doc(`/posts/${request.params.postId}`).update({commentsCount});
        })
        .then(doc => {
            countUpdated = true;
            return response.status(201).json({message: `comment ${commentId} created successfully`});
        })
        .catch(error => {
            console.error(error);
            if (commentCreated && !countUpdated) {
                return db
                .doc(`/comments/${commentId}`)
                .delete()
                .then(doc => {
                    return response.status(500).json({error: "Something went wrong. Try again"});
                })
                .catch(error => {
                    console.error(error);
                    return response.status(500).json({error: error.code});
                })
            }
            return response.status(500).json({error: error.code});
        });
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    })
};

exports.deleteComment = (request, response) => {
    db
    .doc(`/comments/${request.params.commentId}`)
    .get()
    .then(doc => {
        if (doc.exists) {
            return doc.ref.delete()
                .then(() => {
                    return db.doc(`/posts/${request.params.postId}`).get();
                })
                .then(doc => {
                    if (doc.exists) {
                        let commentsCount = doc.data().commentsCount - 1;
                        return doc.ref.update({commentsCount})
                                .then(() => {
                                    return response.status(200).json({message: "comment deleted successfully"});
                                })
                                .catch(error => {
                                    console.error(error);
                                    return response.status(500).json({error: error.code});
                                })
                    } else return response.status(404).json({error: "Post not found"});
                })
                .catch(error => {
                    console.error(error);
                    return response.status(500).json({error: error.code});
                });
        } else return response.status(404).json({error: "Comment not found"});
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    });
}