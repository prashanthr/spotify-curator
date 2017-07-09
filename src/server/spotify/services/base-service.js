import SpotifyWebApi from 'spotify-web-api-node'
import config from 'config'
import _debug from 'debug'
var debug = _debug('spotify-base-service')

// credentials are optional
var spotify = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret,
  redirectUri: config.spotify.redirectUri
})

// spotify.setAccessToken(config.spotify.accessToken)

export default class SpotifyServiceBase {
  constructor () {
    this.spotify = spotify
    this.isInitialized = false
    this.token = null
  }

  async initialize () {
    const token = await this.getToken()
    this.setAccessToken(token)
    this.initialized = true
  }

  async getToken () {
    const result = await this.spotify.clientCredentialsGrant()
    debug(`Access Token Response: ${JSON.stringify(result)}`)
    return result.body.access_token
  }

  async refreshToken () {
    const result = await this.spotify.refreshAccessToken()
    debug(`Access Token Response: ${JSON.stringify(result)}`)
    const token = result.body.access_token
    this.setAccessToken(token)
    return token
  }

  setAccessToken (token) {
    this.token = token
    this.spotify.setAccessToken(token)
  }

  async grantAuthCode () {
    // this.spotify.authorizationCodeGrant(code: )
  }
}
