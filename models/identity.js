const mongoose = require('mongoose')

const IdentitySchema = new mongoose.Schema({
  access_token: {
    type: String,
    required: true
  },
  refresh_token: {
    type: String,
    required: true
  },
  expiry_date: {
    type: Number,
    required: true
  },
  token_type: {
    type: String,
    required: true
  }
}, { timestamps: true })

const IDENTITY = mongoose.model('identity', IdentitySchema)

module.exports = IDENTITY