const Form = require('../models/Form')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')

router.post('', AdminPolicy.isAdmin, function (req, res) {
    let form = new Form({
        title: req.body.title,
        form_questions: req.body.form_questions,
        active: req.body.active,
        accessibility_scopes: req.body.accessibility_scopes
    })
    form.save(function (err) {
        if (err) {
            console.log(err)
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                form: form
            })
        }
    })
})

router.get('', AdminPolicy.isAdmin, function (req, res) {
    Form.find({}, function (err, forms) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                forms: forms
            })
        }
    })
})

router.get('/:id', AdminPolicy.isAdmin, function (req, res) {
    Form.findById(req.params.id, function (err, form) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                form: form
            })
        }
    })
})

router.put('/:id', AdminPolicy.isAdmin, function (req, res) {
    Form.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
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
    Form.deleteOne({_id: req.params.id}, function (err) {
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