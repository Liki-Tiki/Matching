const UserAnswer = require('../models/UserAnswer')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')
const IsAuthenticated = require('../policies/IsAuthenticated')

router.post('', IsAuthenticated, function (req, res) {
    let userAnswer = new UserAnswer({
        user_fk_id: req.user._id,
        form_fk_id: req.body.form_fk_id,
        answers: req.body.answers,
        personal_answers: req.body.personal_answers
    })
    userAnswer.save(function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                userAnswer: userAnswer
            })
        }
    })
})

router.get('', AdminPolicy.isAdmin, function (req, res) {
    UserAnswer.find({}, function (err, answer) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                userAnswer: answer
            })
        }
    })
})

router.get('/:id', AdminPolicy.isAdmin, function (req, res) {
    UserAnswer.findById(req.params.id, function (err, answer) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                userAnswer: answer
            })
        }
    })
})

router.put('/:id', AdminPolicy.isAdmin, function (req, res) {
    UserAnswer.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
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
    UserAnswer.deleteOne({_id: req.params.id}, function (err) {
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