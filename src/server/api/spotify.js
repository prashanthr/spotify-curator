// @flow
import Spotify from '../spotify'
import { publicRouter } from '../router'
import _debug from 'debug'
var debug = _debug('api:spotify')

export default (app) => {
  publicRouter.get('/api/spotify', async (req, res) => {
    const helloSpotify = `Hello Spotify`
    debug(helloSpotify)
    res.send(helloSpotify)
  })

  publicRouter.get('/api/spotify/search/:term', async (req, res) => {
    res.send(await Spotify.search({ query: req.params.term }))
  })

  publicRouter.get('/api/spotify/search-track/:term', async (req, res) => {
    res.send(await Spotify.search({
      query: req.params.term,
      types: ['track']
    }))
  })

  publicRouter.get('/api/spotify/search-album/:term', async (req, res) => {
    res.send(await Spotify.search({
      query: req.params.term,
      types: ['album']
    }))
  })

  publicRouter.get('/api/spotify/search-artist/:term', async (req, res) => {
    res.send(await Spotify.search({
      query: req.params.term,
      types: ['artist']
    }))
  })

  publicRouter.get('/api/spotify/search-playlist/:term', async (req, res) => {
    res.send(await Spotify.search({
      query: req.params.term,
      types: ['playlist']
    }))
  })

  publicRouter.get('/api/spotify/features', async (req, res) => {
    const query = req.query
    const ids = query.ids
      ? query.ids.indexOf(',') !== -1
        ? query.ids.split(',')
        : [query.ids]
      : []
    debug(`Getting features for ${ids}`)
    res.send(await Spotify.getFeatures(ids))
  })

  publicRouter.get('/api/spotify/analysis/:id', async (req, res) => {
    res.send(await Spotify.analyze(req.params.id))
  })

  return app
}
