const express = require('express')
const router = express.Router()

const authRouter = require('../routes/auth')
const youtubeRouter = require('../routes/youtube')

router.get('/', function (req, res, next) {
  res.send('hello')
})

router.use('/auth', authRouter)
router.use('/youtube', youtubeRouter)

module.exports = router
