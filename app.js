const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')

const routes = require('./routes/index')

// DB specific
const mongoose = require('mongoose')
const mongoDBURI = 'mongodb://localhost/outreach'
mongoose.connect(mongoDBURI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express()

if (process.env.PRODUCTION === 'true') {
  app.use(express.static('./client/dist'))
}

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/', routes)

if (process.env.PRODUCTION === 'true') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('./client/dist/index.html'))
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
})

module.exports = app
