import SpotifyWebApi from 'spotify-web-api-node'
import config from 'config'

// credentials are optional
var spotify = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret,
  redirectUri: config.spotify.redirectUri
})

spotify.setAccessToken(config.spotify.accessToken)

export default spotify
