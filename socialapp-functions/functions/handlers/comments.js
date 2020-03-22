const {db} = require('../util/admin');

// comment on a post
exports.createComment = (request, response) => {
    if (request.body.body.trim() === '') return reponse.status(400).json({comment: "Invalid comment. Must not be empty"});
    let commentData = {
        body: request.body.body,
        createdAt: new Date().toISOString(),
        username: request.user.username,
        postId: request.params.postId,
        userImage: request.user.imageUrl,
    };
    let commentCount = 0;
    let batch = db.batch();
    let postDocRef = db.doc(`/posts/${request.params.postId}`);
    postDocRef.get()
    .then(doc => {
        if (!doc.exists) return response.status(404).json({error: "Post not found"});
        if (doc.data().commentCount) commentCount = doc.data().commentCount;
        let newCommentDoc = db.collection('comments').doc();
        // let commentId = newCommentDoc.id;
        batch.set(newCommentDoc, commentData);
        commentCount++;
        batch.update(postDocRef, {commentCount});
        return batch
            .commit()
            .then(() => {
                return newCommentDoc.get(); 
            })
            .then(doc => {
                return response.status(201).json({
                    commentId: doc.id,
                    ...doc.data()
                });
            })
            .catch(error => {
                console.error(error);
                return response.status(500).json({error: error.code});
            });
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    })
};

exports.deleteComment = (request, response) => {
    let batch = db.batch();
    let commentRef = db.doc(`/comments/${request.params.commentId}`);
    let postRef = db.doc(`/posts/${request.params.postId}`);
    commentRef
    .get()
    .then(doc => {
        if (doc.exists) {
            batch.delete(commentRef);
            return postRef
                .get()
                .then(doc => {
                    if(doc.exists) {
                        let commentsCount = doc.data().commentsCount-1;
                        batch.update(postRef, {commentsCount});
                    }
                    return batch.commit();
                })
                .then(() => {
                    return response.status(200).json({message: "comment deleted successfully"});
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