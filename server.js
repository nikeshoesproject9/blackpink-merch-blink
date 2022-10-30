var express = require('express');
var app = express();
app.use(express.static('maincss'))

const path = require('path');
const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
//app.set('views', '/views');

var fs = require("firebase-admin");
let serviceAccount;
if (process.env.GOOGLE_CREDENTIALS != null) {
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS)
    console.log('GOOGLE_CREDENTIALS != null')
        // private_key = (`${process.env.private_key}`).replace(/\\n/g, '\n')
} else {
    serviceAccount = require("./kpopmerchandise-ffee7-firebase-adminsdk-8miny-a06d502298.json")
    console.log('GOOGLE_CREDENTIALS = null')
}
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();
const itemsColl = db.collection('items');

app.get('/', async function(req, res) {
    const items = await itemsColl.get();
    console.log(items.docs.length);
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('home', data);
});