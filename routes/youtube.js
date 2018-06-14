const express = require('express')
const router = express.Router()
const {google} = require('googleapis')
const googleAuth = require('../libs/google')
const youtubeModel = require('../models/youtube')

router.get('/statistics', async (req, res, next) => {
  const tokens = {
    access_token: 'ya29.GlvYBZy4-0Z1FUH_MCXzzT1shsl52dUirVIR--_Lx0_XautcT0c9D49PSlzUYBQJu2u7oNmP0tSGe3Z-TV1XJJdiaiPLhMt_B9hjdZZR2vUi8tPSeO7u2OYJt1c5',
    refresh_token: '1/nH-Iohivfz5LG0eSZtDGw1-_W1qdf0adC3nanbmf4J7D-4liS662fYmcbO9s7-m0',
    expiry_date: 1528834764170
  }

  const client = googleAuth.client()

  client.credentials = tokens

  const youtube = google.youtube({
    version: 'v3',
    auth: client
  })

  const statistics = await youtube.channels.list({part: 'statistics', mine: true})

  statistics.data.items.forEach(async (channel) => {
    try {
      const query = {channel_id: channel.id, statistics: channel.statistics}
      const update = {expire: new Date()}
      const options = {upsert: true, new: true, setDefaultsOnInsert: true}

      const youtubeRes = await youtubeModel.findOneAndUpdate(query, update, options)

      res.json(youtubeRes)
    } catch (e) {
      console.log(e)
    }
  })
})

module.exports = router