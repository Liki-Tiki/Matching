const express = require('express')
let router = express.Router()

const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

router.post('/login',
    AuthenticationController.login)

router.put('/updateUser',
    isAuthenticated,
    AuthenticationController.updateUser)

module.exports = router
