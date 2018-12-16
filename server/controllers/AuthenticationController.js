/* eslint-disable no-unused-vars */
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    register (req, res) {
        const { email, password } = req.body
        let user = new User()
        user.email = email
        user.password = password
        user.first_name = email.toString().slice(0, email.toString().search('\\.'))
        user.last_name = email.toString().slice(email.toString().search('\\.') + 1, email.toString().search('@'))
        user.save(function (err) {
            if (err) {
                console.log(err)
                res.status(400).send({
                    error: 'This email is already in use.'
                })
            } else {
                const userJson = user.toJSON()
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                })
            }
        })
    },
    login (req, res) {
        const { email, password } = req.body
        User.findOne({ 'email': email }, async function (err, user) {
            try {
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    return res.status(403).send({
                        error: 'The login information was incorrect'
                    })
                }
                const userJson = user.toJSON();
                res.send({
                    user: userJson,
                    token: jwtSignUser(userJson)
                });
            } catch (err) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
        })
    },
    updateUser (req, res) {
        const { password } = req.body
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
    }
}
