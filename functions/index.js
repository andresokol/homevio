// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const Jimp = require('jimp');

const A = { x: 270, y: 695 };

exports.genImage = functions.https.onRequest(async (req, res) => {
    let image = await Jimp.read('./promo_v1.png');
    console.log(req.body);
    const phone = req.body.phone;
    await Jimp.loadFont(Jimp.FONT_SANS_10_BLACK).then(font => image.print(font, A.x, A.y, phone));
    // await image.writeAsync('out.png');

    let buf = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set('Content-Type', Jimp.MIME_PNG);
    res.send(buf);
});

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Cloud Firestore under the path /messages/:documentId/original
// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//     const writeResult = await admin.firestore().collection('messages').add({ original: original });
//     // Send back a message that we've succesfully written the message
//     res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

// // Listens for new messages added to /messages/:documentId/original and creates an
// // uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//         // Grab the current value of what was written to Cloud Firestore.
//         const original = snap.data().original;

//         // Access the parameter `{documentId}` with `context.params`
//         console.log('Uppercasing', context.params.documentId, original);

//         const uppercase = original.toUpperCase();

//         // You must return a Promise when performing asynchronous tasks inside a Functions such as
//         // writing to Cloud Firestore.
//         // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
//         return snap.ref.set({ uppercase }, { merge: true });
//     });
