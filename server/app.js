const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const AuthenticationController = require('./controllers/AuthenticationController')

mongoose.connect('mongodb://dashboard:dashboard@mongodb:27017/matching', { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', function() {
    console.log('Connected to MongoDB')
})

db.on('error', function (err) {
   console.log(err)
})

let indexRouter = require('./routes')

require('./passport')

let app = express()

app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())
app.use(indexRouter)
app.get('/about.json',
    AuthenticationController.about)
app.use(express.static(require("path").join(__dirname, "dist")))

app.enable('trust proxy')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    //res.status(err.status || 500)
    res.redirect('/')
})

module.exports = app