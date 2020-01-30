const {db} = require('../util/admin');
const config = require('../util/config');
const {validateSignup, validateLogin} = require('../util/validateData');

const firebase = require('firebase');

firebase.initializeApp(config);

exports.signup = (request, response) => {
    let newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        username: request.body.username
    };

    let result = validateSignup(newUser);

    if (result.invalid) return response.status(400).json(result.errors);

    let userId, token;
    db
    .doc(`/users/${newUser.username}`)
    .get()
    .then((documentSnapshot) => {
        if (documentSnapshot.exists)  {
            return response.status(400).json({username: "username already exists"});
        } else {
            return firebase.auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
                    .then((data) => {
                        userId = data.user.uid;
                        return data.user.getIdToken();
                    })
                    .then((idToken) => {
                        token = idToken;
                        let userCredentials = {
                            email: newUser.email,
                            createdAt: new Date().toISOString(),
                            userId
                        }
                        return db
                                .doc(`/users/${newUser.username}`)
                                .set(userCredentials);
                    })
                    .then(() => {
                        return response.status(201).json({token});
                    })
                    .catch((error) => {
                        if (error.code === 'auth/email-already-in-use') {
                            return response.status(400).json({email: 'email already in use'});
                        } else {
                            console.error(error);
                            return response.status(500).json({error: error.code});
                        }
                    })
        }
    })    
    .catch((error) => {
        console.error(error);
        return response.status(500).json({error: error.code});
    })
};

exports.login = (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password
    };

    let result = validateLogin(user);

    if (result.invalid) return response.status(400).json(result.errors);

    // authentication request to firebase
    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(credentials => {
        return credentials.user.getIdToken();
    })
    .then(token => {
        return response.status(200).json({token});
    })
    .catch(error => {
        console.error(error);
        if (error.code === 'auth/wrong-password'
            || error.code === 'auth/user-not-found') {
            return response.status(403).json({general: "Wrong credentials, please try again"});
        }
        return response.status(500).json({error:  error.code});
    });
};