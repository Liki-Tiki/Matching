const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const indexRouter = require('./Routes')

mongoose.connect('mongodb://admin:fF8zd0PL@localhost:27017/matching', { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', function () {
  console.log('Connected to MongoDB')
})

db.on('error', function (err) {
  console.log(err)
})

let app = express()

app.set('view engine', 'jade')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())
app.use(/^\/api/, indexRouter)
require('./Passport')
app.use(express.static(require('path').join(__dirname, 'dist')))

app.enable('trust proxy')

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
    res.render('error')
})

module.exports = app
