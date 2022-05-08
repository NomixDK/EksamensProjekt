const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static("./"));
app.use(express.json());

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

//NEW HIGHSCORE
app.post("/highscore", (request, response) => {
    console.log("Inserting highscore: " + request.body.name + ", " + request.body.score + ", " + request.body.hash);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: request.body.name, score: request.body.score, hash: request.body.hash };
        dbo.collection("highscores").insertOne(myobj, function (err, res) {
            if (err) throw err;

            console.log("Inserted: " + JSON.stringify(myobj))
            response.header("Access-Control-Allow-Origin", "*");
            response.json(myobj);
            db.close();
        });
    });
});

//UPDATE HIGHSCORE
app.put("/highscore", (request, response) => {
    console.log("Updating highscore of " + request.body.name + " to " + request.body.score + ", " + request.body.hash);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { hash: request.body.hash };
        var newvalues = { $set: { name: request.body.name, score: request.body.score } };
        dbo.collection("highscores").updateOne(myquery, newvalues, function (err, obj) {
            if (err) throw err;

            console.log("Successfully updated score of: " + request.body.name + " to " + request.body.score + ", " + request.body.hash)
            response.header("Access-Control-Allow-Origin", "*");
            response.json({ name: request.body.name, score: request.body.score });
            db.close();
        });
    });
});

//GETTING SCORES
app.get("/highscores", (request, response) => {
    console.log("Finding highscores... ");

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("highscores").find({}).toArray(function (err, result) {
            if (err) throw err;

            console.log(result);
            response.header("Access-Control-Allow-Origin", "*");
            response.json({ result });
            db.close();
        });
    });
});

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port)
})

