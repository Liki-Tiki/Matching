const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://yesexy:2411630ed@ds043158.mlab.com:43158/matching-str', { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err)
    db = client.db('matching-str')

    app.listen(4200, () => {
        console.log('listening on 4200')
    })
})

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Authentication");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post('/quotes', (req, res) => {
    res.status(200)
    res.end("fdppp")
})

