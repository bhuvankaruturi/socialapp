const {admin, db} = require('./admin');

// middleware to authorize user requests
module.exports = (request, response, next) => {
    let idToken;
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1];
    } else {
        console.error("Missing token");
        return response.status(403).json({error: "Unauthorized request"});
    }

    admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
        request.user = decodedToken;
        return db.collection('users')
                .where("userId", "==", request.user.uid)
                .limit(1)
                .get();
    })
    .then(querySnapshot => {
        if (querySnapshot.docs.length > 0){
            request.user.username = querySnapshot.docs[0].id;
            request.user.imageUrl = querySnapshot.docs[0].data().imageUrl;
            if (!request.user.imageUrl) request.user.imageUrl = "";
            return next();
        } else {
            console.error('Error while verifying user', error.code);
            return response.status(403).json({error: error.code});
        }
    })
    .catch(error => {
        console.error('Error while verifying user', error.code);
        return response.status(403).json({error: error.code});
    });
};