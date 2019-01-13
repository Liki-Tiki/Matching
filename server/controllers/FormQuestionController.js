const FormQuestion = require('../models/FormQuestion')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')

router.post('', AdminPolicy.isAdmin, function (req, res) {
    let formQuestion = new FormQuestion({
        title: req.body.title,
        answers: req.body.answers,
        personal_question_fk_id: req.body.personal_question_fk_id,
        weight: req.body.weight
    })
    formQuestion.save(function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                formQuestion: formQuestion
            })
        }
    })
})

router.get('', AdminPolicy.isAdmin, function (req, res) {
    FormQuestion.find({}, function (err, formQuestion) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                formQuestion: formQuestion
            })
        }
    })
})

router.get('/:id', AdminPolicy.isAdmin, function (req, res) {
    FormQuestion.findById(req.params.id, function (err, formQuestion) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                formQuestion: formQuestion
            })
        }
    })
})

router.put('/:id', AdminPolicy.isAdmin, function (req, res) {
    FormQuestion.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
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
    FormQuestion.deleteOne({_id: req.params.id}, function (err) {
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