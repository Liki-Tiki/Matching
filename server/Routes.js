const express = require('express')
let router = express.Router()
const userRoutes = require('./routes/UserRoutes')
const formRoutes = require('./routes/FormRoutes')
const personalQuestionRoutes = require('./routes/PersonalQuestionRoutes')
const formQuestionRoutes = require('./routes/FormQuestionRoutes')
const answerRoutes = require('./routes/AnswerRoutes')

router.use(/^\/user/, userRoutes)

router.use(/^\/form/, formRoutes)

router.use(/^\/answer/, answerRoutes)

router.use(/^\/form\/question/, formQuestionRoutes)

router.use(/^\/personal\/question/, personalQuestionRoutes)

module.exports = router
