const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://defaultuser:1UhNtTFDeXdmFO60@mycluster.kiclo.mongodb.net/test";

app.use(express.json());
app.use(express.static('/'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))
app.use('/js', express.static(__dirname + '/public/js'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/landing.html'));
})

app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/leaderboard.html'));
})

app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/settings.html'));
})

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})