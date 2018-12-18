const express = require('express')
let router = express.Router()
const userRoutes = require('./routes/UserRoutes.js')

router.use(/^\/user/, userRoutes)

module.exports = router
