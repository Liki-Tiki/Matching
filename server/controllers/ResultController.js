const Result = require('../models/Result')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')
const IsAuthenticated = require('../policies/IsAuthenticated')

router.post('', AdminPolicy.canManageUser, function (req, res) {
    let result = new Result({
        user_fk_id: req.user._id,
        form_fk_id: req.body.form_fk_id,
        results: req.body.results
    })
    result.save(function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                userAnswer: result
            })
        }
    })
})

router.get('', AdminPolicy.isAdmin, function (req, res) {
    Result.find({}, function (err, result) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                result: result
            })
        }
    })
})

router.get('/:id', AdminPolicy.canManageUser, function (req, res) {
    Result.findById(req.params.id, function (err, result) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                result: result
            })
        }
    })
})

router.get('/me', IsAuthenticated, function (req, res) {
    Result.find({user_fk_id: req.user._id}, function (err, result) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send({
                result: result
            })
        }
    })
})

router.put('/:id', AdminPolicy.canManageUser, function (req, res) {
    Result.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
        if (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        } else {
            return res.status(200).send()
        }
    });
})

router.delete('/:id', AdminPolicy.canManageUser, function (req, res) {
    Result.deleteOne({_id: req.params.id}, function (err) {
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