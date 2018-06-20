const express = require('express')
const router = express.Router()

const {google} = require('googleapis')
const googleAuth = require('../libs/google')

const Identity = require('../models/identity')
const youtubeModel = require('../models/youtube')


router.get('/statistics', async (req, res, next) => {
  try {
    var credentials = await Identity.findOne()
  } catch (err) {
    res.send(err.message)
  }

  const client = googleAuth.client()

  client.credentials = credentials

  const youtube = google.youtube({
    version: 'v3',
    auth: client
  })

  const statistics = await youtube.channels.list({part: 'statistics', mine: true})

  statistics.data.items.forEach(async (channel) => {
    try {
      const query = {channel_id: channel.id}
      const update = {statistics: channel.statistics}
      const options = {upsert: true, new: true, setDefaultsOnInsert: true}

      const youtubeRes = await youtubeModel.findOneAndUpdate(query, update, options)

      res.json(youtubeRes)
    } catch (e) {
      res.send(e.message)
    }
  })
})

module.exports = router