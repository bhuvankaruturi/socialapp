const {admin, db} = require('../util/admin');

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
};

//TODO: temporary route - to be deleted
exports.getImage = (request, response) => {
    const file = admin.storage().bucket().file(request.body.filename);
    let options = {
        action: 'read',
        expires: '03-17-2025'
    }
    file
    .getSignedUrl(options)
    .then(url => {
        return response.status(200).json({url});
    })
    .catch(error => {
        return response.status(500).json({error: error.code});
    });
}