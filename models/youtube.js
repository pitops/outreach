const mongoose = require('mongoose')

const YoutubeSchema = new mongoose.Schema({
  statistics: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  channel_id: {
    type: String,
    required: true
  }
}, { collection: 'youtube', timestamps: true })

const YOUTUBE = mongoose.model('youtube', YoutubeSchema)

module.exports = YOUTUBE