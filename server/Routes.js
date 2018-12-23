const express = require('express')
let router = express.Router()
const formRoutes = require('./routes/FormRoutes')
const personalQuestionRoutes = require('./routes/PersonalQuestionRoutes')
const formQuestionRoutes = require('./routes/FormQuestionRoutes')
const answerRoutes = require('./routes/AnswerRoutes')
const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')

router.use(/^\/user/, AuthenticationController)

router.use(/^\/users/, UserController)

router.use(/^\/form/, formRoutes)

router.use(/^\/answer/, answerRoutes)

router.use(/^\/form\/question/, formQuestionRoutes)

router.use(/^\/personal\/question/, personalQuestionRoutes)

module.exports = router
