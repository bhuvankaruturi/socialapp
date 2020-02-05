const {admin, db} = require('../util/admin');
const {validateSignup, validateLogin, reduceUserDetails} = require('../util/validateData');
const config = require('../util/config');
const firebase = require('../util/firebaseApp');
const NO_IMAGE_FILE = 'no-img.webp';

exports.signup = (request, response) => {
    let newUser = {
        email: request.body.email,
        password: request.body.password,
        confirmPassword: request.body.confirmPassword,
        username: request.body.username,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${NO_IMAGE_FILE}?alt=media`
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
                            userId,
                            imageUrl: newUser.imageUrl
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
        if (error.code === 'auth/wrong-password'
            || error.code === 'auth/user-not-found') {
            return response.status(403).json({general: "Wrong credentials, please try again"});
        }
        return response.status(500).json({error:  error.code});
    });
};

// function to add user details
exports.addUserDetails = (request, response) => {
    let userDetails = reduceUserDetails(request.body);
    if (Object.keys(userDetails).length > 0) {
        db
        .doc(`/users/${request.user.username}`)
        .update(userDetails)
        .then(() => {
            return response.status(200).json({message: 'user details updated successfully'});
        })
        .catch(error => {
            console.error(error);
            return response.status(500).json({error: error.code});
        });
    } else {
        return response.status(400).json({error: 'Bad request. Invalid user details'});
    }
}

// get authenticated user details
exports.getAuthenticatedUserData = (request, response) => {
    let userData = {};
    db
    .doc(`/users/${request.user.username}`)
    .get()
    .then(doc => {
        if (doc.exists) {
            userData.credentials = doc.data();
            return db.collection('likes').where('username','==', request.user.username).get();
        } else {
            return response.status(500).json({error: 'user not found'});
        }
    })
    .then(data => {
        userData.likes = [];
        data.forEach(doc => {
            userData.likes.push(doc.data());
        });
        return response.status(200).json(userData);
    })
    .catch(error => {
        console.error(error);
        return response.status(500).json({error: error.code});
    });
}

exports.uploadImage = (request, response) => {
    const path = require('path'),
            os = require('os'),
            fs = require('fs');

    const BusBoy = require('busboy');
    var busboy = new BusBoy({headers: request.headers});

    let fileToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, enconding, mimetype) => {
        let regex = /^image.*$/;
        if (regex.test(mimetype)) {
            let filenameArr = filename.split('.');
            let fileExtension = filenameArr[filenameArr.length-1];
            let filepath = `${Math.round(Math.random() * 10000000)}-${filenameArr[0]}.${fileExtension}`;
            filepath = path.join(os.tmpdir(), filepath);
            fileToBeUploaded = { filepath, mimetype };
            file.pipe(fs.createWriteStream(filepath));
        } else {
            return response.status(400).json({error: 'Invalid file type. Profile picture must be a image file.'})
        }
    });

    busboy.on('finish', () => {
        let currentFilename = "";
        let bucket;
        db.doc(`/users/${request.user.username}`).get()
        .then(doc => {
            if (doc.exists) currentFilename = doc.data().image;
        })
        .catch(error => {
            console.error(error);
        });

        admin.storage().bucket().upload(fileToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: fileToBeUploaded.mimetype
                }
            }
        })
        .then((data) => {
            let imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${data[0].metadata.name}?alt=media`;
            return db.doc(`/users/${request.user.username}`).update({imageUrl, image: data[0].metadata.name});
        })
        .then(() => {
            if (currentFilename !== "" && currentFilename !== NO_IMAGE_FILE) {
                return admin.storage().bucket()
                            .file(currentFilename)
                            .delete()
                            .then(() => {
                                console.log(currentFilename + " image deleted");
                                return response.status(201).json({message:"Image uploaded successfully"});
                            })
                            .catch(error => {
                                console.error(error);
                                return response.status(500).json({error: error.code});
                            });
            }
            else {
                return response.status(201).json({message:"Image uploaded successfully"});
            } 
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({error: error.code});
        });
    });
    busboy.end(request.rawBody);
};