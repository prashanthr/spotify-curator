// @flow
import Spotify from '../spotify'
import { publicRouter } from '../router'
import _debug from 'debug'
var debug = _debug('api:spotify')

export default (app) => {
  publicRouter.get('/api/spotify', async (req, res) => {
    const helloSpotify = 'Hello Spotify'
    debug(helloSpotify)
    res.send(helloSpotify)
  })

  publicRouter.get('/api/search/:term', async (req, res) => {
    res.send(await Spotify.search({ query: req.params.term }))
  })

  return app
}
