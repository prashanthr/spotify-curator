// @flow
import Spotify from '../spotify'
import { publicRouter } from '../router'
import _debug from 'debug'
var debug = _debug('api:spotify')

export default (app) => {
  publicRouter.get('/api/spotify', async (req, res) => {
    debug('Hello Spotify')
    res.send({
      text: 'Hello Spotify',
      data: Spotify
    })
  })
  return app
}
