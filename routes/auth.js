const express = require('express')
const router = express.Router()

const googleAuth = require('../libs/google')
const Identity = require('../models/identity')

const qs = require('query-string')

router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/google', (req, res, next) => {
  const config = {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
  }

  res.redirect(googleAuth.getAuthUrl(config))
})

router.get('/google/callback', async (req, res, next) => {
  const client = googleAuth.client()

  const code = qs.parse(req.url.replace(/^.*\?/, ''))

  if (code) {
    const {tokens} = await client.getToken(code)
    const identity = new Identity(tokens)

    try {
      await identity.save()
      res.send('Identity saved!')
    } catch (err) {
      res.send(err.message)
    }
  }
})

router.get('/google/revoke', async (req, res, next) => {
  const client = googleAuth.client()

  try {
    var identity = await Identity.findOne()
  } catch (err) {
    res.send(err.message)
  }

  try {
    await client.revokeToken(identity.refresh_token)
    await Identity.remove({_id: identity._id})
    res.send('Access revoked')
  } catch (e) {
    res.send(e.message)
  }
})

module.exports = router
