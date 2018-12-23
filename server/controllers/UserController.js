const User = require('../models/User')
const express = require('express')
const router = express.Router()
const AdminPolicy = require('../policies/AdminPolicy')

router.get('',
    AdminPolicy.isAdmin,
    function (req, res) {
        const user = req.user
        let emails = ''
        for (let i = 0; user.admin_scopes.length !== i; i++) {
            if (i !== 0) {
                emails += '|'
            }
            emails += user.admin_scopes[i]
        }
        User.find({'email': new RegExp('^.+\\..+@' + emails + '$')}, function (err, docs) {
            return res.status(200).send({
                users: docs
            })
        })

    })

router.get('/:id',
    AdminPolicy.canManageUser,
    function (req, res) {
        User.findById(req.params.id, function (err, user) {
            res.status(200).send({
                user: user
            })
        })
    })

router.put('/:id',
    AdminPolicy.canManageUser,
    function (req, res) {
//TODO: func
    })

router.delete('/:id',
    AdminPolicy.canManageUser,
    function (req, res) {
        User.deleteOne({_id: req.params.id}, function (err) {
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