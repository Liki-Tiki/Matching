const express = require('express')
let router = express.Router()
const UserController = require('./controllers/UserController')
const AuthenticationController = require('./controllers/AuthenticationController')
const FormController = require('./controllers/FormController')
const AnswerController = require('./controllers/AnswerController')
const ResultController = require('./controllers/ResultController')
const UserAnswerController = require('./controllers/UserAnswerController')
const FormQuestionController = require('./controllers/FormQuestionController')
const PersonalQuestionController = require('./controllers/PersonalQuestionController')

router.use(/^\/user/, AuthenticationController)

router.use(/^\/users/, UserController)

router.use(/^\/forms/, FormController)

router.use(/^\/answers/, AnswerController)

router.use(/^\/results/, ResultController)

router.use(/^\/userAnswers/, UserAnswerController)

router.use(/^\/formQuestions/, FormQuestionController)

router.use(/^\/personalQuestions/, PersonalQuestionController)

module.exports = router
