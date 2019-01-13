const Answer = require('../models/Answer')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')

router.post('', AdminPolicy.isAdmin, function (req, res) {
    let answer = new Answer({
        title: req.body.title,
        image_url: req.body.imageUrl
    })
    answer.save(function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                answer: answer
            })
        }
    })
})

router.get('', AdminPolicy.isAdmin, function (req, res) {
    Answer.find({}, function (err, answer) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                answer: answer
            })
        }
    })
})

router.get('/:id', AdminPolicy.isAdmin, function (req, res) {
    Answer.findById(req.params.id, function (err, answer) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                answer: answer
            })
        }
    })
})

router.put('/:id', AdminPolicy.isAdmin, function (req, res) {
    Answer.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send()
        }
    });
})

router.delete('/:id', AdminPolicy.isAdmin, function (req, res) {
    Answer.deleteOne({_id: req.params.id}, function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send()
        }
    })
})

module.exports = router