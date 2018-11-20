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

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})
