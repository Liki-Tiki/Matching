const express = require('express')
let router = express.Router()
const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')

router.use(/^\/user/, AuthenticationController)

router.use(/^\/users/, UserController)

module.exports = router
