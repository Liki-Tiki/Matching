const passport = require('passport')
const User = require('../models/User')

module.exports = {
    isAdmin(req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (err || !user) {
                res.status(403).send({
                    error: 'you do not have access to this resource'
                })
            } else {
                req.user = user
                if (user.admin === true) {
                    next()
                } else {
                    res.status(403).send({
                        error: 'you do not have access to this resource'
                    })
                }
            }
        })(req, res, next)
    },
    canManageUser(req, res, next) {
        passport.authenticate('jwt', function (err, user) {
            if (err || !user) {
                res.status(403).send({
                    error: 'you do not have access to this resource'
                })
            } else {
                req.user = user
                if (user.admin === true) {
                    User.findOne({'_id': req.params.id}, async function (error, userToManage) {
                        try {
                            for (let i = 0; i !== user.admin_scopes.length; i++) {
                                let regExp = new RegExp('^.+\\..+@' + user.admin_scopes[i] + '$')
                                if (regExp.test(userToManage.email)) {
                                    next()
                                    return
                                }
                            }
                            return res.status(403).send({
                                error: 'you do not have access to this resource'
                            })
                        } catch (error) {
                            return res.status(400).send({
                                error: 'This user doesn\'t exist'
                            })
                        }
                    })
                } else {
                    res.status(403).send({
                        error: 'you do not have access to this resource'
                    })
                }
            }
        })(req, res, next)
    }
}
