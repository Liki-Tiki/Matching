const User = require('../models/User')

module.exports = {
    getAll(req, res) {
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

    },
    get(req, res) {
        User.findById(req.params.id, function (err, user) {
            res.status(200).send({
                user: user
            })
        })
    },
    update(req, res) {
//TODO: func
    },
    delete(req, res) {
        User.deleteOne({_id: req.params.id}, function (err) {
            if (err) {
                return res.status(400).send({
                    error: 'An error has occurred.'
                })
            } else {
                return res.status(200).send()
            }
        })
    }
}