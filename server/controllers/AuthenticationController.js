const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/Config')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    register(req, res) {
        const {email, password, sexualOrientation, gender} = req.body
        let user = new User({
            email: email,
            password: password,
            first_name: email.toString().slice(0, email.toString().search('\\.')),
            last_name: email.toString().slice(email.toString().search('\\.') + 1, email.toString().search('@')),
            sexual_orientation: sexualOrientation,
            gender: gender
        })
        user.save(function (err) {
            if (err) {
                console.log(err)
                res.status(400).send({
                    error: 'This email is already in use.'
                })
            } else {
                res.status(200).send()
            }
        })
    },
    login(req, res) {
        const {email, password} = req.body
        User.findOne({'email': email}, async function (err, user) {
            try {
                if (!user.verified) {
                    return res.status(400).send({
                        error: 'you must verified your email first'
                    })
                }
                const isMatch = await user.comparePassword(password)
                if (!isMatch) {
                    return res.status(403).send({
                        error: 'The login information was incorrect'
                    })
                }
                const userJson = user.toJSON()
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })
            } catch (err) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
        })
    },
    update(req, res) {
        const {password} = req.body
        let user = req.user
        user.password = password
        user.save(function (err) {
            if (err) {
                return res.status(400).send({
                    error: 'An error has occurred.'
                })
            }
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        })
    },
    delete(req, res) {
        const user = req.user
        User.deleteOne({_id: user._id}, function (err) {
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
