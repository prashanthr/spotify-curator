// @flow
import Spotify from '../spotify'

export default (app) => {
  app.get('/api/spotify', async (req, res) => {
    console.log('Hello')
    res.send({
      text: 'Hello Spotify',
      data: Spotify
    })
  })
}
