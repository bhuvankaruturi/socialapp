const admin = require('firebase-admin');
let serviceAccount = require('../socialapp-5380a-firebase_1.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-5380a.firebaseio.com",
    storageBucket: "socialapp-5380a.appspot.com"
});

const db = admin.firestore();

module.exports = {admin, db};