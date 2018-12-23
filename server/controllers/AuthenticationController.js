const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/Config')
const nodemailer = require('nodemailer')
require('dotenv').config()

const isAuthenticated = require('../policies/IsAuthenticated')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
})

const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf'

router.post('/register',
    AuthenticationControllerPolicy.register,
    function (req, res) {
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
                jwt.sign(
                    {
                        user: user.toJSON()
                    },
                    EMAIL_SECRET,
                    {
                        expiresIn: '7d'
                    },
                    (err, emailToken) => {
                        const url = 'http://localhost:8080/api/user/confirmation/' + emailToken

                        transporter.sendMail({
                            to: email,
                            subject: 'Confirm Email',
                            html: `Please click <a href="${url}">here</a> to confirm your email`
                        })
                    })
                res.status(200).send()
            }
        })
    })

router.post('/login',
    function (req, res) {
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
    })

router.put('/update',
    isAuthenticated,
    function (req, res) {
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
    })

router.delete('/delete',
    isAuthenticated,
    function (req, res) {
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
    })

router.get('/confirmation/:token',
    function (req, res) {
        try {
            const {user} = jwt.verify(req.params.token, EMAIL_SECRET)
            User.findById(user._id, function (err, user) {
                if (err) {
                    console.log(err)
                    res.status(400).send({
                        error: 'An error has occurred.'
                    })
                } else {
                    user.verified = true
                    user.save(function (err) {
                        if (err) {
                            console.log(err)
                            res.status(400).send({
                                error: 'An error has occurred.'
                            })
                        } else {
                            res.redirect('http://localhost:8081/#/login')
                            res.status(200).send()
                        }
                    })
                }
            })
        } catch (err) {
            return res.status(400).send({
                error: 'An error has occurred.'
            })
        }
    }
)

module.exports = router