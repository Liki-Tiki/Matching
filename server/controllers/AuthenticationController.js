const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser(user) {
    const ONE_WEEk = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEk
    })
}

module.exports = {
    register(req, res) {
        const {username, password} = req.body
        let user = new User()
        user.username = username
        user.password = password
        user.save(function (err) {
            if (err) {
                console.log(err)
                res.status(400).send({
                    error: 'This username is already in use.'
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
    login(req, res) {
        const {username, password} = req.body
        User.findOne({'username': username}, async function (err, user) {
            if (err) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
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
        })
    }, updateUser(req, res) {
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
    }
}
