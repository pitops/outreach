const {google} = require('googleapis')

const credentials = require('../credentials')

function client (opts = {}) {
  return new google.auth.OAuth2(
    credentials.youtube.CLIENT_ID,
    credentials.youtube.CLIENT_SECRET,
    opts.url || 'http://localhost:8080/auth/google/callback'
  )
}

function getAuthUrl (opts = {}) {
  if (!opts.scope) {
    throw new Error('Please provide at least one scope')
  }

  if (!opts.access_type) {
    throw new Error('Access type was not provided')
  }

  return client().generateAuthUrl({
    access_type: opts.access_type,
    scope: opts.scope
  })
}

module.exports = {client,getAuthUrl}