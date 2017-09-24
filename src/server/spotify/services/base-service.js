import SpotifyWebApi from 'spotify-web-api-node'
import config from 'config'
import cuid from 'cuid'
import querystring from 'querystring'
import axios from 'axios'
import _debug from 'debug'
var debug = _debug('spotify-base-service')

var spotify = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret,
  redirectUri: config.spotify.redirectUri
})

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

  async getAuthCode (authUrl: string) {
    //const parsed = querystring.parse(authUrl)
    //return parsed.code || ''
    const response = await axios.get(authUrl)
    debug('code? ', response.data)
    return ''
  }

  async authFlow (scopes = [
    'user-read-private',
    'playlist-read-private',
    'playlist-modify-private'
  ], state = cuid()) {
    this.state = state
    const authorizeURL = await this.spotify.createAuthorizeURL(scopes, state)
    debug('Auth URL', authorizeURL)
    const authCode = await this.getAuthCode(authorizeURL)
    this.authorizeURL = authorizeURL
    this.authCode = authCode
    debug(this)
    await this.authCodeGrant()
  }

  async authCodeGrant (code: string) {
    const response = await this.spotify.authorizationCodeGrant(code)
    this.setAccessToken(response.body.access_token)
  }

  parseResponse (response) {
    if (response.statusCode !== 200) {
      throw new Error(response.body)
    } else {
      return response.body
    }
  }
}
