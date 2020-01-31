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