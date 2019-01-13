const PersonalQuestion = require('../models/PersonalQuestion')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')

router.post('', AdminPolicy.isAdmin, function (req, res) {
    let personalQuestion = new PersonalQuestion({
        title: req.body.title,
        answers: req.body.answers,
        form_question_fk_id: req.body.form_question_fk_id
    })
    personalQuestion.save(function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                personalQuestion: personalQuestion
            })
        }
    })
})

router.get('', AdminPolicy.isAdmin, function (req, res) {
    PersonalQuestion.find({}, function (err, personalQuestion) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                personalQuestion: personalQuestion
            })
        }
    })
})

router.get('/:id', AdminPolicy.isAdmin, function (req, res) {
    PersonalQuestion.findById(req.params.id, function (err, personalQuestion) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            res.status(200).send({
                personalQuestion: personalQuestion
            })
        }
    })
})

router.put('/:id', AdminPolicy.isAdmin, function (req, res) {
    PersonalQuestion.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
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
    PersonalQuestion.deleteOne({_id: req.params.id}, function (err) {
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