const express = require('express')
const router = express.Router()
const {google} = require('googleapis')
const googleAuth = require('../libs/google')

const qs = require('query-string')

/* GET users listing. */
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
    console.log('tokens', tokens)
  }
  res.send('respond with a resource')
})

router.get('/google/revoke', async (req, res, next) => {
  const client = googleAuth.client()

  try {
    const resp = await client.revokeToken('ya29.GlvYBQzB0yfdaA_K-9kbJ-F7i6z8iWP3RazZT69ECq9NjTVZ6q6tPnX7xBNilGSCNG0ieOEXHKAAmkGhaZnO_2RoU21awmC2IVVcH0jWctDpc2qvHaRUCmkV_ZyM')
    console.log('resp', resp)
  } catch (e) {
    console.log(e.message)
  }
})

module.exports = router
