const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context)=>{
    //only admin made admin
    if (context.auth.token.admin !== true) {
        return {error: 'Admin can add another admin'};
        
    }



    return admin.auth().getUserByEmail(data.email).then(user=>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(()=>{
        return{
            message: `Succes! ${data.email} has been made an admin`
        }
    }).catch(err =>{
        return err;
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
