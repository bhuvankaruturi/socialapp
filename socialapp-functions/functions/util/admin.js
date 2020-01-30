const admin = require('firebase-admin');
let serviceAccount = require('../socialapp-5380a-firebase.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialapp-5380a.firebaseio.com"
});

const db = admin.firestore();

module.exports = {admin, db};